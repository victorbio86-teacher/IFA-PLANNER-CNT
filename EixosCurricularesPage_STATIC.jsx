import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BookOpen, Book, Users, Zap, Briefcase, ChevronDown, ChevronUp, PlayCircle, Mic, MessageSquare, Download } from 'lucide-react';

// =========================================================================
// Dados dos Eixos Estruturantes (AGORA COM CAMINHOS ESTÁTICOS WAV)
// =========================================================================

interface EixoContent {
    name: string;
    icon: React.ElementType;
    fullDescription: string;
    // Caminho estático para o áudio. Deve estar na pasta /audios/
    audioFile: string; 
}

const EIXOS_DATA: EixoContent[] = [
    {
        name: 'Método, Conhecimento e Ciência (Investigação Científica)',
        icon: Book,
        fullDescription: "O eixo **Investigação Científica** é a espinha dorsal de todo o trabalho em Ciências da Natureza. Seu objetivo fundamental é capacitar o estudante a ir além da memorização de fatos e dados, ensinando o rigoroso 'como' chegamos ao conhecimento científico validado. O foco principal é o **Letramento Científico** completo, que envolve a capacidade de ler, compreender e, crucialmente, participar do processo de investigação. Isso significa que o aluno deve dominar a arte de formular perguntas investigáveis, elaborar hipóteses testáveis e planejar experimentos controlados. Em Biologia, um excelente exemplo seria guiar a turma a formular e testar hipóteses sobre a variação da taxa de fotossíntese em diferentes condições de luz e cor. Em Física, o aluno pode ser desafiado a projetar um método para medir a aceleração da gravidade usando apenas materiais simples, registrando e analisando os dados com precisão. Este eixo exige o desenvolvimento de habilidades de argumentação baseada em evidências, a identificação de variáveis dependentes e independentes, e a compreensão crítica de vieses em estudos científicos, replicando o método que estrutura o próprio conhecimento da área.",
        audioFile: '/audios/metodo_conhecimento_ciencia.wav', 
    },
    {
        name: 'Mediação e Intervenção Sociocultural',
        icon: Users,
        fullDescription: "O conhecimento em Ciências da Natureza não pode ser estéril; ele deve ser uma poderosa ferramenta de engajamento e transformação social. O eixo **Mediação e Intervenção Sociocultural** exige que o aluno faça a ponte essencial entre o rigor científico e as necessidades urgentes da comunidade. A Mediação é a habilidade de traduzir informações científicas complexas, como dados sobre poluição hídrica ou relatórios epidemiológicos, para uma linguagem clara e acessível a diversos públicos. Por exemplo, criar materiais informativos sobre a resistência bacteriana para apresentar em uma feira de saúde local. A Intervenção, por sua vez, é a ação ética e responsável: se a comunidade sofre com a falta de saneamento, os alunos podem aplicar conhecimentos de Química e Biologia para prototipar um sistema de filtragem de efluentes de baixo custo usando materiais reciclados. Este eixo promove o desenvolvimento da Bioética, o diálogo e a visão de que o cientista é um agente ativo. O estudante aprende a analisar problemas socioambientais locais (como o descarte inadequado de lixo ou a gestão de recursos hídricos) e a promover uma transformação social justa e sustentável através da ciência.",
        audioFile: '/audios/mediacao_intervencao_sociocultural.wav', 
    },
    {
        name: 'Inovação e Intervenção Tecnológica',
        icon: Zap,
        fullDescription: "Este eixo estrutura o aprendizado para unir o conhecimento científico puro ao desenvolvimento prático de soluções e protótipos criativos, focando na geração de valor. **Inovação e Intervenção Tecnológica** significa ir além da compreensão da teoria para aplicá-la na criação de algo novo ou na melhoria de algo existente. A Inovação começa na ideação, como, por exemplo, o desenvolvimento de um novo tipo de embalagem biodegradável após estudar a polimerização (Química) ou a concepção de um sistema de energia eólica mais eficiente (Física). A Intervenção é a aplicação estratégica e técnica. Por exemplo, os alunos podem utilizar microcontroladores (como Arduinos), conhecimentos de Eletrônica e Meteorologia para criar um sensor automatizado que otimiza o uso sustentável da água na agricultura, acionando a irrigação apenas quando necessário. Este eixo estimula intensamente o desenvolvimento do pensamento computacional, a cultura *maker* e o *design thinking*. O objetivo é que o estudante prototipe, simule cenários e teste iterações, transformando a teoria científica em um produto ou processo de impacto positivo, preparando-o para o ecossistema de alta tecnologia e empreendedorismo.",
        audioFile: '/audios/inovacao_intervencao_tecnologica.wav', 
    },
    {
        name: 'Mundo do Trabalho e Transformação Social',
        icon: Briefcase,
        fullDescription: "Este eixo crucial conecta o aprendizado de Ciências da Natureza diretamente ao Projeto de Vida do estudante e à sua atuação no mercado de trabalho e na sociedade. Ele garante que o conhecimento acadêmico gere valor profissional, ético e social. O foco aqui não é apenas na técnica, mas na análise estratégica. Por exemplo, ao estudar matrizes energéticas (Física e Química), o aluno deve analisar a viabilidade econômica, os riscos e o impacto ambiental da transição para fontes renováveis, simulando um estudo de caso de consultoria empresarial. O eixo exige o desenvolvimento de competências socioemocionais cruciais: gestão de projetos (do início ao fim), comunicação assertiva em equipe multidisciplinar, e, principalmente, responsabilidade ética e socioambiental nas decisões. O objetivo é preparar o estudante para entender e navegar pelas complexidades do mundo profissional, garantindo que ele não apenas possua o conhecimento científico, mas saiba usá-lo como um agente proativo, capaz de tomar decisões informadas que contribuam para a construção de uma sociedade mais sustentável e justa.",
        audioFile: '/audios/mundo_trabalho_transformacao_social.wav', 
    },
];


// =========================================================================
// Componente de Detalhe do Eixo (Exibe Texto Completo e Botão de Reprodução)
// =========================================================================

interface EixoDetalheProps extends EixoContent {}

const EixoDetalhe: React.FC<EixoDetalheProps> = ({ name, fullDescription, audioFile }) => {
    const audioRef = useRef<HTMLAudioElement>(null); 
    const [isPlaying, setIsPlaying] = useState(false);

    // Efeito para sincronizar o estado isPlaying
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        // Define a fonte do áudio
        audio.src = audioFile;

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audioFile]);

    const handleTogglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (audio) {
            if (audio.paused) {
                audio.play().catch(e => console.error("Erro ao tentar tocar:", e));
            } else {
                audio.pause();
                audio.currentTime = 0; // Opcional: rebobina ao pausar
            }
        }
    }, []);

    const handleDownload = useCallback(() => {
        if (audioFile) {
            const a = document.createElement('a');
            a.href = audioFile;
            a.download = `${name.replace(/[^a-z0-9]/gi, '_')}.mp3`; // Nome de arquivo seguro
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }, [audioFile, name]);


    return (
        <div className="space-y-6">
            
            {/* Seção de Texto Original Completo (Fundo Índigo Suave) */}
            <div className="p-5 bg-indigo-50 border-l-4 border-indigo-500 rounded-xl shadow-inner transition-all duration-300">
                <h3 className="font-extrabold text-xl text-indigo-800 flex items-center mb-3 border-b pb-2 border-indigo-300">
                    <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" />
                    Descrição Detalhada do Eixo
                </h3>
                <p className="text-gray-700 leading-relaxed text-justify">
                    {fullDescription}
                </p>
            </div>

            {/* Seção de Controles de Áudio Estático (Fundo Esmeralda) */}
            <div className="p-5 bg-emerald-50 border-l-4 border-emerald-500 rounded-xl shadow-md transition-all duration-300">
                <h4 className="font-bold text-lg text-emerald-800 flex items-center mb-4">
                    <Mic className="w-5 h-5 mr-2 text-emerald-600" /> Áudio Pré-Gravado (WAV)
                </h4>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
                    
                    {/* Botão de Reprodução/Pausa */}
                    <button
                        onClick={handleTogglePlay}
                        className="flex items-center justify-center flex-1 min-w-40 px-6 py-3 bg-emerald-600 text-white font-extrabold rounded-full hover:bg-emerald-700 transition duration-300 shadow-lg shadow-emerald-300/50 text-base transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <PlayCircle className={`w-5 h-5 mr-2 transition-transform ${isPlaying ? 'opacity-0 scale-0 absolute' : 'opacity-100 scale-100 relative'}`} /> 
                        {isPlaying ? 'Pausar e Reiniciar' : 'Ouvir Narração'}
                    </button>
                    
                    {/* Botão de Download */}
                    <button
                        onClick={handleDownload}
                        className="flex items-center justify-center flex-1 min-w-40 px-6 py-3 bg-blue-600 text-white font-extrabold rounded-full hover:bg-blue-700 transition duration-300 shadow-lg shadow-blue-300/50 text-base transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <Download className="w-5 h-5 mr-2" /> Baixar WAV
                    </button>
                </div>
                
                {/* Visualização de Áudio Estático */}
                <div className="mt-4 pt-4 border-t border-emerald-300">
                    <h5 className="font-semibold text-emerald-700 mb-2 text-center text-sm">Controle Nativo:</h5>
                    {/* Elemento <audio> com o caminho estático como SRC */}
                    <audio 
                        ref={audioRef} 
                        controls 
                        className="w-full shadow-xl rounded-lg bg-white border border-emerald-300"
                    >
                        Seu navegador não suporta o elemento de áudio.
                    </audio>
                    <p className="text-xs text-center text-gray-500 mt-2">
                        Fonte do áudio: <code>{audioFile}</code>. Verifique se o arquivo está na pasta `audios/` do seu repositório.
                    </p>
                </div>
            </div>
        </div>
    );
};


// =========================================================================
// Componente Principal e Acordeão (App)
// =========================================================================

interface AccordionItemProps {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, icon: Icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-indigo-200 rounded-2xl shadow-xl bg-white overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <button
                className={`flex justify-between items-center w-full p-6 text-left font-bold transition duration-300 ${isOpen ? 'bg-indigo-100/70 border-b border-indigo-300 text-indigo-800' : 'bg-white hover:bg-indigo-50 text-gray-800'}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                    <Icon className="w-7 h-7 mr-4 text-indigo-600" />
                    <h2 className="text-xl sm:text-2xl">{title}</h2>
                </div>
                {isOpen ? <ChevronUp className="w-6 h-6 text-indigo-600" /> : <ChevronDown className="w-6 h-6 text-indigo-600" />}
            </button>
            
            <div 
                className={`transition-max-height ease-in-out duration-700 overflow-hidden`}
                style={{ maxHeight: isOpen ? '9999px' : '0' }}
            >
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Componente Principal, renomeado para 'App' para facilitar a implantação em sistemas simples
const App: React.FC = () => {
    // Nota: Removida a lógica de navegação (onBackToMenu) porque este é um app de página única para o GitHub Pages.
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-10 font-sans">
            <div className="max-w-5xl mx-auto">
                
                {/* Título e Subtítulo - Design Impactante */}
                <header className="text-center mb-12 p-8 bg-white rounded-3xl shadow-2xl border-b-8 border-indigo-600 transform hover:scale-[1.01] transition-transform duration-300">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-900 flex items-center justify-center leading-tight">
                        <BookOpen className="w-10 h-10 mr-4 text-indigo-600" />
                        Eixos Curriculares Estruturantes
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-700 mt-4 font-light italic">
                        Entenda como o eixo curricular estruturante se conecta com a área de Ciências da Natureza.
                    </p>
                    <p className="text-md text-gray-500 mt-3">
                        Este aplicativo usa **áudios MP3 pré-gravados** carregados diretamente do seu repositório GitHub.
                    </p>
                </header>

                {/* Lista de Eixos */}
                <div className="space-y-8">
                    {EIXOS_DATA.map((eixo, index) => (
                        <AccordionItem 
                            key={index}
                            title={eixo.name}
                            icon={eixo.icon}
                        >
                            <EixoDetalhe {...eixo} />
                        </AccordionItem>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
