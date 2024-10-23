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

			</article>
		</main>
	);
}
