/* Shared site data — the single source for the case-study generator
   (tools/build-case-studies.js) and the interactive modules.
   Every fact here comes from the owner's locked fact sheet. If a fact is not
   in this file, it must not appear on the site. No invented facts. */
window.PORTFOLIO_DATA = {
  projects: [
    {
      slug: "draftshot", num: "01", title: "DraftShot", side: false,
      status: "Has known limits",
      tagline: "Real-time multiplayer game engine, designed around a server-authoritative 60 ticks/sec loop.",
      summary: "A real-time multiplayer game engine. Clients send keyboard-state deltas, the server runs a fixed-step loop designed at 60 ticks/sec, and the authoritative state is the truth.",
      problem: "A multiplayer game where every client must see the same game, and no client can be trusted to report where it is.",
      how: [
        "Clients send keyboard-state deltas, not positions.",
        "The server runs a fixed-step loop, server-authoritative.",
        "A shared physics module runs in the browser and on the server.",
        "Collision uses AABB plus Ghost Box.",
        "First to 5 wins the round."
      ],
      stack: ["Node.js", "Express", "Raw WebSockets", "Spring Boot", "JavaScript"],
      limits: [
        "The Java login accepts ANY username with NO password check and issues a JWT.",
        "JwtFilter is an empty, unused file.",
        "The leaderboard returns a hard-coded list.",
        "Players are an in-memory list.",
        "Auth hardening is the next task, not a done feature."
      ],
      links: { repo: "https://github.com/sahilimamk/Game_multi", live: null },
      diagram: ["Client — keyboard-state deltas", "Server — fixed-step loop", "Shared physics module", "Authoritative state back to clients"],
      tickRateNote: true
    },
    {
      slug: "dsa-buddy", num: "02", title: "DSA Buddy", side: false,
      status: "Repo only",
      tagline: "An AI peer for DSA prep — a study partner, not a tutor.",
      summary: "An AI peer for DSA preparation. A study partner, not a tutor. An LLM application, not a machine learning project.",
      problem: "DSA practice where the helper should discuss and interview, not hand over solutions.",
      how: [
        "LLM answers are streamed over SSE.",
        "Provider adapters for OpenAI and Anthropic Claude, bring your own key.",
        "Two-stage persona pipeline: a content model, then a peer-voice rewrite. Code blocks are byte-verified verbatim; the pipeline fails open.",
        "Cold-start calibration: LeetCode import and submission analysis, then interviewer-mode problems, then buddy mode.",
        "A memory layer keeps a mistake journal, merges repeats within 6 hours, and uses session callbacks.",
        "Voice mode uses the Web Speech API. A C++ editor is included. 20 curated problems. Socratic interviewer mode."
      ],
      stack: ["React", "Vite", "Express", "SQLite", "SSE", "OpenAI", "Anthropic Claude"],
      limits: null,
      notList: ["RAG", "embeddings / vector database", "fine-tuning", "training", "LangChain", "MCP", "evals"],
      links: { repo: "https://github.com/sahilimamk/dsa-buddy", live: null },
      diagram: ["LeetCode import + submission analysis", "Interviewer-mode problems", "Buddy mode", "Mistake journal memory layer"]
    },
    {
      slug: "fire-detection", num: "03", title: "Smart Fire Detection System", side: false,
      status: "No public link yet",
      tagline: "Three fused sensor sources plus camera detection, to cut false positives.",
      summary: "A fire detection system that fuses three sources — sensors and camera — so a single noisy sensor does not raise an alarm on its own.",
      problem: null,
      how: [
        "ESP32 with DHT22, MQ-2 and MQ-135 sensors, over I2C via Arduino.",
        "A 3-room test environment.",
        "YOLO and OpenCV camera detection at 20 FPS.",
        "A live 2D floor plan.",
        "MQTT, under 200 ms.",
        "Three fused sources cut false positives."
      ],
      stack: ["ESP32", "Arduino", "DHT22", "MQ-2", "MQ-135", "YOLO", "OpenCV", "MQTT"],
      limits: null,
      links: { repo: null, live: null },
      diagram: ["DHT22 / MQ-2 / MQ-135 sensors", "YOLO + OpenCV camera — 20 FPS", "Fusion — 3 sources", "Live 2D floor plan"]
    },
    {
      slug: "car-dealership", num: "04", title: "Car Dealership", side: false,
      status: "Live demo",
      tagline: "Full-stack car dealership app with a typed API and a passing test suite.",
      summary: "A full-stack car dealership application: a React front end, a typed Express API, and a test suite that passes 28 out of 28.",
      problem: null,
      how: [
        "React 19 with Router v7, Tailwind v4, Vite and Axios on the front end.",
        "Express 4 with TypeScript 5 on the back end.",
        "An in-memory store by default, MongoDB optional.",
        "Zod validation, JWT and bcryptjs.",
        "Vitest and Supertest: 28 out of 28 tests passing."
      ],
      stack: ["React 19", "Router v7", "Tailwind v4", "Vite", "Axios", "Express 4", "TypeScript 5", "Zod", "JWT", "bcryptjs", "Vitest", "Supertest", "MongoDB"],
      limits: [
        "Server round-trips take about 45–60 seconds on free Render (cold starts).",
        "Prices and stock re-seed randomly per load."
      ],
      links: { repo: "https://github.com/sahilimamk/car-dealership", live: "https://car-dealership-teal-seven.vercel.app" },
      diagram: ["React 19 front end", "Express 4 + TypeScript 5 API", "In-memory store / MongoDB optional", "Vitest + Supertest — 28/28"]
    },
    {
      slug: "miniledger", num: "05", title: "MiniLedger", side: false,
      status: "Live demo",
      tagline: "Friend and loan tracking, with due dates.",
      summary: "A friend and loan tracker: who owes what, and when it is due.",
      problem: null,
      how: [
        "Node and TypeScript API backed by Postgres.",
        "An Expo app on the front end.",
        "Friend and loan tracking with due dates."
      ],
      stack: ["Node.js", "TypeScript", "Postgres", "Expo"],
      limits: null,
      links: { repo: "https://github.com/sahilimamk/miniledger", live: "https://miniledgerproject.netlify.app" },
      diagram: ["Expo app", "Node + TypeScript API", "Postgres"]
    },
    {
      slug: "ai-army", num: "06", title: "AI Army", side: false,
      status: "Repo only",
      tagline: "One dashboard commanding 8 free AI models, each with a role.",
      summary: "A dashboard commanding 8 free AI models, each with a role, routed through OpenRouter under a strict $0-spend rule. Public, MIT licensed.",
      problem: null,
      how: [
        "A dashboard commands 8 free AI models.",
        "Each model has a role.",
        "Models are routed via OpenRouter.",
        "A strict $0-spend rule: free models only."
      ],
      stack: ["OpenRouter", "JavaScript"],
      limits: null,
      links: { repo: "https://github.com/sahilimamk/ai-army", live: null },
      diagram: ["Dashboard", "OpenRouter routing", "8 free models, each with a role"]
    },
    {
      slug: "portman", num: "07", title: "PortMan", side: false,
      status: "Repo only",
      tagline: "A GTK3 port manager GUI for a Linux desktop.",
      summary: "A GTK3 port manager GUI: see what is listening, manage connections and the firewall, from one window.",
      problem: null,
      how: [
        "Tabs: Listening Ports, All Connections, UFW Firewall, USB/Serial.",
        "Kill by port, and ufw block/allow.",
        "A bind-verified port check, a filter, and a 3-second auto-refresh.",
        "A --cli mode for the terminal."
      ],
      stack: ["GTK3", "Python", "UFW", "Linux"],
      limits: null,
      links: { repo: "https://github.com/sahilimamk/portman", live: null },
      diagram: ["Listening Ports", "All Connections", "UFW Firewall", "USB / Serial"]
    },
    {
      slug: "netbond", num: "08", title: "NetBond", side: true,
      status: "No public link yet",
      tagline: "A Linux transparent proxy that learns which link is fastest.",
      summary: "A Linux transparent proxy that learns throughput and latency, and picks links from what it has measured.",
      problem: null,
      how: [
        "A Linux transparent proxy, built on nftables REDIRECT and SO_BINDTODEVICE.",
        "It learns throughput and RTT with EWMA.",
        "Per-hour buckets and per-destination medians."
      ],
      stack: ["Linux", "nftables", "C / Systems"],
      limits: null,
      links: { repo: null, live: null },
      diagram: ["nftables REDIRECT", "EWMA throughput / RTT", "Per-hour buckets", "Per-destination medians"]
    },
    {
      slug: "apex", num: "09", title: "APEX", side: true,
      status: "No public link yet",
      tagline: "A unified learning performance daemon for Linux laptops.",
      summary: "A unified learning performance daemon for Linux laptops, watching CPU, memory, I/O, network and thermals, and learning from the workload.",
      problem: null,
      how: [
        "Covers CPU, memory, I/O, network and thermals.",
        "Workload detection with EWMA online learning.",
        "6 plugins. 78 out of 78 tests passing."
      ],
      stack: ["Linux", "Python", "Systems"],
      limits: null,
      links: { repo: null, live: null },
      diagram: ["CPU / memory / I/O / network / thermals", "Workload detection", "EWMA online learning", "6 plugins — 78/78 tests"]
    },
    {
      slug: "stocky", num: "10", title: "Stocky", side: true,
      status: "No public link yet",
      tagline: "A paper-trading game with live NSE quotes and ₹1,00,000 virtual cash.",
      summary: "A paper-trading game: ₹1,00,000 of virtual cash, live NSE quotes, and a portfolio to manage — no real money.",
      problem: null,
      how: [
        "₹1,00,000 virtual cash.",
        "Live NSE quotes, refreshing every 15 minutes on weekdays during market hours.",
        "Buy and sell, portfolio profit and loss, and trade history."
      ],
      stack: ["JavaScript", "NSE quotes"],
      limits: null,
      links: { repo: null, live: null },
      diagram: ["Live NSE quotes — every 15 min", "Buy / sell", "Portfolio P/L", "Trade history"]
    }
  ],
  skillMap: [
    { skill: "Node.js", level: "Strong", projects: ["draftshot", "dsa-buddy", "miniledger", "car-dealership"],
      evidence: { "draftshot": "Real-time game server on Node.js and Express.", "dsa-buddy": "Express back end streaming LLM answers over SSE.", "miniledger": "Node + TypeScript API backed by Postgres.", "car-dealership": "Express 4 + TypeScript 5 API." } },
    { skill: "WebSockets", level: "Strong", projects: ["draftshot"],
      evidence: { "draftshot": "Raw WebSockets carry keyboard-state deltas and authoritative state." } },
    { skill: "TypeScript", level: "Strong", projects: ["miniledger", "car-dealership"],
      evidence: { "miniledger": "Node + TypeScript API.", "car-dealership": "Express 4 + TypeScript 5 API." } },
    { skill: "Postgres", level: "Strong", projects: ["miniledger"],
      evidence: { "miniledger": "Node + TypeScript API backed by Postgres." } },
    { skill: "Databases", level: "Strong / Good", projects: ["miniledger", "dsa-buddy", "car-dealership"],
      evidence: { "miniledger": "Postgres.", "dsa-buddy": "SQLite.", "car-dealership": "In-memory store by default, MongoDB optional." } },
    { skill: "Real-time", level: "Strong", projects: ["draftshot", "fire-detection", "stocky"],
      evidence: { "draftshot": "Server-authoritative loop; clients send deltas, the server sends state back.", "fire-detection": "MQTT under 200 ms, live 2D floor plan.", "stocky": "Live NSE quotes, refreshing every 15 minutes on weekdays during market hours." } },
    { skill: "LLM apps", level: "3/5", projects: ["dsa-buddy", "ai-army"],
      evidence: { "dsa-buddy": "Provider adapters for OpenAI and Anthropic Claude, BYOK; an LLM application, not an ML project.", "ai-army": "8 free models routed via OpenRouter under a strict $0-spend rule." } },
    { skill: "Testing", level: "—", projects: ["car-dealership", "apex"],
      evidence: { "car-dealership": "Vitest + Supertest, 28 out of 28 passing.", "apex": "78 out of 78 tests passing." } },
    { skill: "Linux/systems", level: "—", projects: ["portman", "netbond", "apex"],
      evidence: { "portman": "GTK3 port manager with UFW firewall controls.", "netbond": "Linux transparent proxy on nftables REDIRECT.", "apex": "Learning performance daemon for Linux laptops." } },
    { skill: "Embedded/IoT", level: "—", projects: ["fire-detection"],
      evidence: { "fire-detection": "ESP32 with DHT22, MQ-2 and MQ-135 sensors over I2C via Arduino." } },
    { skill: "React", level: "Still levelling", projects: ["dsa-buddy", "car-dealership"],
      evidence: { "dsa-buddy": "React + Vite front end.", "car-dealership": "React 19 + Router v7 + Tailwind v4 front end." } }
  ],
  tickSteps: [
    { n: 1, title: "Clients send keyboard-state deltas", text: "Each client sends what keys are pressed — a keyboard-state delta. Nobody sends a position." },
    { n: 2, title: "The server runs its fixed-step loop", text: "The server steps the game forward on a fixed schedule. The loop is the clock everything else follows." },
    { n: 3, title: "The shared physics module applies the input", text: "The same physics module runs in the browser and on the server, so both sides agree on what an input means." },
    { n: 4, title: "AABB + Ghost Box collision", text: "Collision is checked with AABB plus Ghost Box, so fast movement does not tunnel through a wall." },
    { n: 5, title: "The authoritative state is the truth", text: "Whatever the server says the game is, that is the game. A client that disagrees is wrong, not the server." },
    { n: 6, title: "State goes back to the clients", text: "The server sends the authoritative state back, and every client renders from it." },
    { n: 7, title: "First to 5 wins the round", text: "The round ends when a player reaches 5. The server decides the score, not the clients." }
  ],
  askMe: [
    { q: "What's your strongest area?", a: "Backend and real-time systems. Node.js, Express, TypeScript, Postgres, WebSockets and backend APIs — that is where I am strongest, and DraftShot is the clearest proof of it." },
    { q: "What's your weakest area?", a: "Frontend and React. I can build with them — DSA Buddy and the Car Dealership app both use React — but it is honestly my weaker side, and I am still levelling it up." },
    { q: "Walk me through DraftShot's architecture.", a: "Clients send keyboard-state deltas, not positions, over raw WebSockets. A Node.js and Express server runs a fixed-step loop, server-authoritative, with a shared physics module that runs in the browser and on the server. Collision is AABB plus Ghost Box, and the first to 5 wins the round. A Spring Boot service handles the lobby, auth and leaderboard." },
    { q: "Is DraftShot's auth production-ready?", a: "No. The Java login accepts any username with no password check and issues a JWT, JwtFilter is an empty unused file, the leaderboard returns a hard-coded list, and players are an in-memory list. Auth hardening is my next task for it — it is not a done feature." },
    { q: "Did you use RAG or fine-tuning in DSA Buddy?", a: "No. DSA Buddy is an LLM application, not a machine learning project. There is no RAG, no embeddings or vector database, no fine-tuning, no training, no LangChain, no MCP and no evals. It streams LLM answers over SSE through provider adapters for OpenAI and Anthropic Claude." },
    { q: "What would you fix next?", a: "DraftShot's auth hardening. A real login with a password check, a working JwtFilter, and a leaderboard that reads real data instead of a hard-coded list." },
    { q: "Why is the Car Dealership demo slow?", a: "It runs on a free Render tier, so the server takes about 45 to 60 seconds to wake up on a cold start. Once it is warm, it responds normally. Prices and stock also re-seed randomly per load." },
    { q: "What are you looking for?", a: "A backend or full-stack internship. I am a CS undergrad at Chandigarh University, 2023 to 2027, and I want to work on real-time systems and APIs." }
  ]
};
