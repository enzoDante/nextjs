'use client';
import ExpandirRetrair from '@/Components/DivExpandirRetrair/DivExpandirRetrair';
import '@/Styles/mainDefault.css';

export default function Home() {
	return (
		<main className='mainHome'>
			<article className='article'>
				<ExpandirRetrair
					titulo={"Editor de Imagem"}
					descricao={"Projeto que permite carregar uma imagem de fundo e adicionar imagem acima da imagem de fundo, permitindo adicionar marcas d'agua ou texto sobre a imagem de fundo e por fim, exportar como png, jpg ou jpeg."} 
					url={'/EditorImagem'}
				/>

				<ExpandirRetrair
					titulo={"ToDo List móveis"}
					descricao={"Projeto que permite adicionar pequenos blocos móveis, onde cada bloco você pode digitar um título e adicionar/remover/check tarefas."} 
					url={'/ToDoList'}
				/>
				<ExpandirRetrair
					titulo={"Aprovar ou Rejeitar"}
					descricao={"Projeto onde vários perfis aleatórios irão aparecer no centro da tela, você pode ler cada informação e mover o perfil para esquerda ou direita indicando que aprovou o perfil ou rejeitou ele, sempre que mover um perfil, um novo irá aparecer no centro da tela. Também mostrará quantos foram aprovados e rejeitados."} 
					url={'/PerfisAprovadoRejeitado'}
				/>
				<ExpandirRetrair
					titulo={"Mover blocos"}
					descricao={"Projeto que permite contém vários blocos lado a lado e você pode trocá-los de lugar, os blocos são fixos em um determinado local, porém podem mudar de posição com outros blocos."} 
					url={'/MoverBlocos'}
				/>
				<ExpandirRetrair
					titulo={"Escudo móvel"}
					descricao={"Você deve manter o cursor sobre o escudo enquanto ele se move, a cada 10 segundos o escudo pode aumentar a velocidade ou diminuir (existe velocidade máxima e tamanho mínimo att)."} 
					url={'/Proteja-se'}
				/>

			</article>
		</main>
	);
}
