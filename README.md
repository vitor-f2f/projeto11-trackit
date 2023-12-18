# TrackIt
Você também passa dias sem acompanhar seus hábitos ou planeja uma rotina mas esquece na semana seguinte? Às vezes, tudo o que precisamos é de um lembrete visual e um sistema de acompanhamento para manter nossos hábitos no caminho certo. É aí que o TrackIt entra em campo.<br>

## Sobre
TrackIt é o front-end de sistema de acompanhamento de hábitos feito em React + Vite. A aplicação permite ao usuário se cadastrar, autenticar, criar hábitos, marcá-los como feitos ou desmarcá-los, com acompanhamento do progresso diário.

### Tecnologias utilizadas
React + Vite, Context API, Styled Components, Axios

### Teste aqui
https://projeto11-trackit-mu-sable.vercel.app/

## Como rodar localmente
1. Clone o repositório com o seguinte comando no terminal: <br>
`git clone https://github.com/vitor-f2f/projeto11-trackit.git`

2. Navegue até a raíz do projeto com: <br> `cd projeto11-trackit`

3. Execute o comando `npm i` para instalar as dependências do projeto;

4. Crie um arquivo .env e o configure conforme .env_example com o link da sua API;

5. Rode o programa com `npm run dev` e abra o endereço do Local indicado no terminal (ou digite "O");

## Como rodar usando Docker

1. Instale o Docker seguindo a documentação: <br>
https://docs.docker.com/desktop/

2. Abra o terminal e puxe a imagem no Docker Hub: <br>
`docker pull face2face/trackit:latest`

3. Execute a imagem localmente:<br>
`docker run -d -p 8080:80 face2face/trackit:latest`

4. Acesse a aplicação em `http://localhost:8080`

5. Para encerrar, encontre o ID do container:
`docker ps`<br>

6. Com o ID, execute os comandos:<br>
`docker stop <container_id>`<br>
`docker rm <container_id>`<br>

## Como funciona
### Página inicial
- Tela de login com campos de email e senha;
- Caso não possua conta, clique no link para se cadastrar na página `/cadastro`;
- Ao realizar login, o usuário é redirecionado para a página de hoje `/hoje`;

### Cadastro
- Tela de cadastro com campos de email, senha, nome e foto de perfil;
- Caso o cadastro seja feito com sucesso, o usuário é redirecionado para página inicial `/`;

### Hoje
- Lista dos hábitos registrados para o dia atual, caso o usuário tenha algum;
- Exibe mensagem e barra circular com progresso de hábitos realizados no dia atual.
- Clique no botão à direita de cada hábito para marcá-lo como concluído, ou desmarcá-lo;
- Na barra de navegação, clique em "Hábitos" para ser redirecionado à página `/habitos`;

### Hábitos
- Lista de todos os hábitos registrados do usuário;
- Caso nenhum hábito esteja registrado, uma mensagem é exibida no lugar da lista;
- Clique no botão "+" para abrir formulário de criação de um novo hábito;
- Digite um nome para o novo hábito e selecione os dias da semana que deseja realizá-lo;
- Ao salvar com sucesso, o formulário é fechado e a lista de hábitos é atualizada;

### Histórico
- Página em construção;