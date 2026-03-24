QA Automation Challenge - MultiBank 🚀

Framework de automação de testes UI construído para atender os requisitos do desafio técnico da MultiBank. O projeto foi desenhado focando em escalabilidade, manutenibilidade e confiabilidade utilizando arquitetura Page Object Model (POM) moderna.

🛠️ Stack Tecnológica

Engine: Playwright

Linguagem: TypeScript

Design Pattern: POM (Page Object Model) via Fixtures (test.extend)

Reports: Playwright HTML Report & Allure Report

CI/CD: GitHub Actions

🏗️ Decisões de Arquitetura (Rationale)

POM com Fixtures: Instanciação das páginas feita através de Fixtures (tests/fixtures/index.ts). Isso remove a necessidade de instanciar o POM new Page(page) no meio do teste, mantendo o código E2E focado apenas na regra de negócio.

Data-Driven Testing (DDT): Textos, rotas esperadas e menus foram extraídos para testData.json. Isso evita hard-coding nos testes e facilita a manutenção se o site mudar o idioma.

Encapsulamento Estrito: Ações do Playwright (goto, waitFor) estão retidas na classe BasePage. Locators são private readonly garantindo que a página defina exatamente o que pode ser exposto.

Resiliência (Waits e Retries): Uso exclusivo de Auto-waiting nativo do Playwright. Não há nenhum sleep fixo no projeto. Retries configurados dinamicamente apenas em CI/CD.

## 🛡️ Handling CAPTCHA (GeeTest) in Production
Durante o desenvolvimento dos testes de Login, observou-se a presença de um sistema Anti-Bot (GeeTest Slider CAPTCHA) no ambiente de produção. 

**Abordagem Arquitetural Escolhida:**
Tentar burlar CAPTCHAs através de manipulação de imagem via UI scripts é um anti-pattern que gera testes instáveis (flaky). Para este desafio, a automação cobre o fluxo de autenticação até o acionamento do gatilho de segurança, validando que o modal "Slide to complete the puzzle" é renderizado corretamente.

*Nota para ambientes reais:* Em um cenário corporativo real (ambiente de QA/Staging), a melhor prática seria:
1. Desabilitar o CAPTCHA no ambiente de testes via feature flag.
2. Interceptar a requisição via `page.route()` (Mocking).
3. Utilizar o `StorageState` do Playwright para injetar um token de sessão válido, ignorando a UI de login para os testes E2E subsequentes.

⚙️ Como Executar o Projeto

1. Instalação

npm install
npx playwright install --with-deps


2. Rodando os Testes E2E (Task 1)

# Roda em background cruzando os browsers
npm run test

# Roda com interface gráfica (Debug/Visualização)
npm run test:ui


3. Visualizando Relatórios Avançados (Allure)

npm run report


4. Executando o Algoritmo de Frequência (Task 2)

npm run task2
