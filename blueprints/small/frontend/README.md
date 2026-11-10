# 🟢 Blueprint: Small (Frontend - Monólito Single-File)

Projetos pequenos (MVPs, ferramentas internas, 1 a 2 desenvolvedores).

---

## 🎯 Filosofia: Monólito em Componente Único (Single-File Component)

Em projetos pequenos, **não utilizamos separação de Base, Controller e View**. Um único arquivo gerencia seu próprio estado, chama a API diretamente e renderiza o JSX.

```text
src/
├── api/
│   └── client.ts         # Chamadas fetch/axios diretas
├── components/
│   └── ItemCard.tsx      # Componente direto (estilo + lógica + JSX no mesmo arquivo)
└── pages/
    └── HomePage.tsx      # Página monolítica (estado + chamada + renderização direta)
```

---

## ⚖️ O que escala vs. O que não escala

- **O que escala:**
  - **Velocidade pura:** cria-se uma tela inteira em 1 arquivo sem cerimônia.
  - **Zero burocracia:** sem injeção de dependência complexa, sem duplicar tipos de `states` e `actions`.
  - **Manutenção trivial para 1 dev:** tudo o que a tela faz está visível de cima a baixo em 50 linhas.

- **O que NÃO escala:**
  - Se a tela começar a ter muitas regras e filtros, o arquivo fica gigante (300+ linhas).
  - Testes isolados de lógica exigem renderizar o componente inteiro no Testing Library.
  - Mais de 2 desenvolvedores editando a mesma tela geram conflitos constantes de merge.
