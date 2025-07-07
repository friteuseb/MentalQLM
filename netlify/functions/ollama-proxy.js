<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zen Assistant - Votre compagnon bien-être</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .app-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 800px;
            min-height: 600px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            animation: slideIn 0.8s ease-out;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .header {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 25px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="30" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="70" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="80" r="2.5" fill="rgba(255,255,255,0.1)"/></svg>');
            animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        .header h1 {
            font-size: 2.2em;
            margin-bottom: 8px;
            font-weight: 300;
            position: relative;
            z-index: 1;
        }

        .header .subtitle {
            font-size: 1.1em;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }

        .privacy-badge {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 25px;
            padding: 8px 16px;
            margin: 15px auto 0;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9em;
            backdrop-filter: blur(10px);
        }

        .privacy-icon {
            width: 16px;
            height: 16px;
            background: #4CAF50;
            border-radius: 50%;
            position: relative;
        }

        .privacy-icon::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 10px;
            font-weight: bold;
        }

        .chat-container {
            flex: 1;
            padding: 30px;
            display: flex;
            flex-direction: column;
            background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%);
        }

        .welcome-message {
            background: linear-gradient(135deg, #667eea20, #764ba220);
            border-radius: 16px;
            padding: 25px;
            margin-bottom: 25px;
            border-left: 4px solid #667eea;
            animation: fadeInUp 1s ease-out 0.3s both;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .welcome-message h2 {
            color: #333;
            margin-bottom: 12px;
            font-size: 1.4em;
            font-weight: 500;
        }

        .welcome-message p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 8px;
        }

        .chat-messages {
            flex: 1;
            overflow-y: auto;
            margin-bottom: 20px;
            padding-right: 10px;
        }

        .message {
            margin-bottom: 20px;
            animation: messageSlide 0.5s ease-out;
        }

        @keyframes messageSlide {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .message.user {
            text-align: right;
        }

        .message.user .message-content {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            margin-left: auto;
        }

        .message.assistant {
            animation-name: messageSlideRight;
        }

        @keyframes messageSlideRight {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .message.assistant .message-content {
            background: white;
            color: #333;
            border: 1px solid #e0e0e0;
            margin-right: auto;
        }

        .message-content {
            max-width: 75%;
            padding: 16px 20px;
            border-radius: 18px;
            display: inline-block;
            word-wrap: break-word;
            line-height: 1.5;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .input-container {
            display: flex;
            gap: 12px;
            align-items: flex-end;
            background: white;
            border-radius: 16px;
            padding: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            border: 1px solid #e0e0e0;
        }

        .message-input {
            flex: 1;
            border: none;
            outline: none;
            padding: 12px 16px;
            font-size: 16px;
            resize: none;
            font-family: inherit;
            background: transparent;
            min-height: 24px;
            max-height: 120px;
        }

        .send-button {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 12px 20px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .send-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .send-button:active {
            transform: translateY(0);
        }

        .send-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .typing-indicator {
            display: none;
            padding: 16px 20px;
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 18px;
            margin-bottom: 20px;
            max-width: 75%;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .typing-dots {
            display: flex;
            gap: 4px;
        }

        .typing-dots span {
            width: 8px;
            height: 8px;
            background: #ccc;
            border-radius: 50%;
            animation: typingBounce 1.4s ease-in-out infinite both;
        }

        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typingBounce {
            0%, 80%, 100% {
                transform: scale(0);
            }
            40% {
                transform: scale(1);
            }
        }

        .suggestions {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .suggestion-chip {
            background: rgba(102, 126, 234, 0.1);
            border: 1px solid rgba(102, 126, 234, 0.2);
            border-radius: 20px;
            padding: 8px 16px;
            cursor: pointer;
            font-size: 14px;
            color: #667eea;
            transition: all 0.3s ease;
        }

        .suggestion-chip:hover {
            background: rgba(102, 126, 234, 0.2);
            transform: translateY(-1px);
        }

        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }

        .modal-content {
            background: white;
            margin: 5% auto;
            padding: 0;
            border-radius: 16px;
            width: 90%;
            max-width: 500px;
            animation: modalSlideIn 0.3s ease-out;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .modal-header {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 20px;
            border-radius: 16px 16px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-header h3 {
            margin: 0;
            font-size: 1.3em;
            font-weight: 500;
        }

        .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s;
        }

        .close-btn:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        /* Breathing Exercise Styles */
        .breathing-container {
            padding: 40px;
            text-align: center;
        }

        .breathing-circle {
            width: 200px;
            height: 200px;
            border: 3px solid #667eea;
            border-radius: 50%;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background: linear-gradient(135deg, #667eea10, #764ba210);
        }

        .breathing-circle.inhale {
            animation: breatheIn 4s ease-in-out;
        }

        .breathing-circle.hold {
            animation: breatheHold 7s ease-in-out;
        }

        .breathing-circle.exhale {
            animation: breatheOut 8s ease-in-out;
        }

        @keyframes breatheIn {
            from { transform: scale(1); }
            to { transform: scale(1.3); }
        }

        @keyframes breatheHold {
            0%, 100% { transform: scale(1.3); }
        }

        @keyframes breatheOut {
            from { transform: scale(1.3); }
            to { transform: scale(1); }
        }

        .breathing-text {
            font-size: 1.2em;
            font-weight: 500;
            color: #667eea;
        }

        .breathing-instructions {
            margin-bottom: 30px;
            color: #666;
            line-height: 1.6;
            max-width: 300px;
            margin-left: auto;
            margin-right: auto;
        }

        .breathing-btn {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .breathing-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .breathing-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        /* Relaxation Menu Styles */
        .relaxation-menu {
            padding: 30px;
            display: grid;
            gap: 20px;
        }

        .relaxation-card {
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            background: linear-gradient(135deg, #f8f9ff, #ffffff);
        }

        .relaxation-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
            border-color: #667eea;
        }

        .relaxation-icon {
            font-size: 2.5em;
            margin-bottom: 15px;
        }

        .relaxation-card h4 {
            margin: 0 0 10px 0;
            color: #333;
            font-size: 1.2em;
        }

        .relaxation-card p {
            margin: 0;
            color: #666;
            font-size: 0.95em;
            line-height: 1.4;
        }

        @media (max-width: 768px) {
            .app-container {
                margin: 10px;
                min-height: calc(100vh - 20px);
            }
            
            .header h1 {
                font-size: 1.8em;
            }
            
            .chat-container {
                padding: 20px;
            }
            
            .message-content {
                max-width: 90%;
            }
        }
    </style>
</head>
<body>
    <div class="app-container">
        <div class="header">
            <h1>🌸 Zen Assistant</h1>
            <p class="subtitle">Votre compagnon bienveillant pour le bien-être mental</p>
            <div class="privacy-badge">
                <div class="privacy-icon"></div>
                <span>100% Local & Privé</span>
            </div>
        </div>

        <div class="chat-container">
            <div class="welcome-message">
                <h2>Bienvenue dans votre espace de bien-être 🌱</h2>
                <p>Je suis ici pour vous accompagner avec bienveillance. Nos conversations restent entièrement privées sur votre appareil.</p>
                <p>Prenez votre temps, exprimez-vous librement. Il n'y a aucun jugement ici.</p>
            </div>

            <div class="suggestions">
                <div class="suggestion-chip" onclick="selectSuggestion('Je me sens un peu anxieux aujourd\'hui')">😟 Je me sens anxieux</div>
                <div class="suggestion-chip" onclick="selectSuggestion('J\'aimerais parler de mes émotions')">💭 Parler d'émotions</div>
                <div class="suggestion-chip" onclick="selectSuggestion('Comment mieux gérer le stress ?')">🌊 Gérer le stress</div>
                <div class="suggestion-chip" onclick="showBreathingExercise()">🌬️ Respiration</div>
                <div class="suggestion-chip" onclick="showRelaxationMenu()">🧘 Relaxation</div>
            </div>

            <div class="chat-messages" id="chatMessages">
                <!-- Messages will appear here -->
            </div>

            <!-- Breathing Exercise Modal -->
            <div class="modal" id="breathingModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>🌬️ Exercice de Respiration</h3>
                        <button class="close-btn" onclick="closeModal('breathingModal')">&times;</button>
                    </div>
                    <div class="breathing-container">
                        <div class="breathing-circle" id="breathingCircle">
                            <div class="breathing-text" id="breathingText">Prêt ?</div>
                        </div>
                        <div class="breathing-instructions" id="breathingInstructions">
                            Cliquez sur "Commencer" pour débuter l'exercice de respiration 4-7-8
                        </div>
                        <button class="breathing-btn" id="breathingBtn" onclick="startBreathing()">Commencer</button>
                    </div>
                </div>
            </div>

            <!-- Relaxation Menu Modal -->
            <div class="modal" id="relaxationModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>🧘 Menu Relaxation</h3>
                        <button class="close-btn" onclick="closeModal('relaxationModal')">&times;</button>
                    </div>
                    <div class="relaxation-menu">
                        <div class="relaxation-card" onclick="startGuidedRelaxation()">
                            <div class="relaxation-icon">🌊</div>
                            <h4>Relaxation Progressive</h4>
                            <p>Détendez chaque partie de votre corps</p>
                        </div>
                        <div class="relaxation-card" onclick="startMindfulness()">
                            <div class="relaxation-icon">🍃</div>
                            <h4>Pleine Conscience</h4>
                            <p>Recentrez-vous sur le moment présent</p>
                        </div>
                        <div class="relaxation-card" onclick="startVisualization()">
                            <div class="relaxation-icon">🌅</div>
                            <h4>Visualisation</h4>
                            <p>Imaginez un lieu paisible</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="typing-indicator" id="typingIndicator">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div class="input-container">
                <textarea 
                    class="message-input" 
                    id="messageInput" 
                    placeholder="Partagez ce que vous ressentez..." 
                    rows="1"
                    onkeydown="handleKeyDown(event)"
                ></textarea>
                <button class="send-button" id="sendButton" onclick="sendMessage()">
                    <span>Envoyer</span>
                    <span>→</span>
                </button>
            </div>
        </div>
    </div>

    <script>
        const MENTAL_HEALTH_PROMPT = `Tu es un assistant en bien-être mental expert, formé aux approches thérapeutiques modernes. Tu parles français avec empathie et professionnalisme.

FORMATION THÉRAPEUTIQUE :
- Thérapie Cognitivo-Comportementale (TCC)
- Approche humaniste centrée sur la personne (Carl Rogers)
- Techniques de mindfulness et pleine conscience
- Psychoéducation et techniques de régulation émotionnelle
- Communication non-violente

PRINCIPES D'ACCOMPAGNEMENT :
1. ÉCOUTE ACTIVE : Reformule ce que dit la personne pour montrer que tu comprends
2. EMPATHIE : Valide les émotions sans les minimiser ("Je comprends que ce soit difficile")
3. QUESTIONS SOCRATIQUES : Aide la personne à découvrir ses propres réponses
4. PSYCHOÉDUCATION : Explique le fonctionnement des émotions/pensées quand approprié
5. TECHNIQUES CONCRÈTES : Propose des outils pratiques (respiration, restructuration cognitive, etc.)

STRUCTURE D'INTERVENTION :
1. ACCUEIL EMPATHIQUE : "Je perçois que..." / "Il semble que..."
2. EXPLORATION : Questions ouvertes pour comprendre la situation
3. NORMALISATION : "C'est une réaction tout à fait compréhensible..."
4. OUTIL/TECHNIQUE : Propose une technique adaptée si approprié
5. ENCOURAGEMENT : Valorise les efforts et ressources de la personne

TECHNIQUES À UTILISER :
- Restructuration cognitive : Questionner les pensées négatives
- Techniques de grounding : 5-4-3-2-1 (5 choses vues, 4 entendues, etc.)
- Respiration cohérence cardiaque : 4 temps inspiration, 4 temps expiration
- Validation émotionnelle : "Vos émotions sont légitimes"
- Recherche de ressources : "Qu'est-ce qui vous aide habituellement ?"

EXEMPLES DE RÉPONSES EMPATHIQUES :
- "Je perçois beaucoup de souffrance dans vos mots..."
- "Il semble que cette situation vous place dans une position difficile..."
- "Votre réaction est tout à fait compréhensible face à ce que vous vivez..."
- "Qu'est-ce qui vous aide habituellement dans ces moments ?"
- "Avez-vous remarqué des déclencheurs particuliers ?"

LIMITES IMPORTANTES :
- Tu n'établis JAMAIS de diagnostic
- Tu orientes vers un professionnel si nécessaire ("Il pourrait être bénéfique de consulter...")
- Tu ne remplaces pas une thérapie, tu accompagnes
- En cas de crise suicidaire : "Je vous encourage vivement à contacter le 3114 (numéro national français de prévention du suicide)"

STYLE DE COMMUNICATION :
- Vouvoiement pour marquer le respect
- Phrases courtes et claires
- Pas de jargon psychologique complexe
- Ton chaleureux mais professionnel
- Évite les conseils directs, privilégie l'accompagnement vers la découverte

Ton objectif est d'aider la personne à mieux comprendre ses émotions, développer ses ressources internes et retrouver un sentiment d'agentivité (capacité d'action sur sa vie).`;

        let conversationHistory = [];
        let breathingTimer = null;

        function selectSuggestion(text) {
            document.getElementById('messageInput').value = text;
            sendMessage();
        }

        function showBreathingExercise() {
            document.getElementById('breathingModal').style.display = 'block';
        }

        function showRelaxationMenu() {
            document.getElementById('relaxationModal').style.display = 'block';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
            if (breathingTimer) {
                clearTimeout(breathingTimer);
                breathingTimer = null;
                document.getElementById('breathingBtn').textContent = 'Commencer';
                document.getElementById('breathingBtn').disabled = false;
                document.getElementById('breathingCircle').className = 'breathing-circle';
                document.getElementById('breathingText').textContent = 'Prêt ?';
            }
        }

        function startBreathing() {
            const btn = document.getElementById('breathingBtn');
            const circle = document.getElementById('breathingCircle');
            const text = document.getElementById('breathingText');
            const instructions = document.getElementById('breathingInstructions');
            
            btn.textContent = 'En cours...';
            btn.disabled = true;
            
            let cycle = 0;
            const totalCycles = 4;
            
            function breathingCycle() {
                if (cycle >= totalCycles) {
                    circle.className = 'breathing-circle';
                    text.textContent = 'Terminé ! 🌟';
                    instructions.textContent = 'Excellent ! Vous avez terminé l\'exercice de respiration. Comment vous sentez-vous ?';
                    btn.textContent = 'Recommencer';
                    btn.disabled = false;
                    cycle = 0;
                    return;
                }
                
                // Inspire (4 secondes)
                circle.className = 'breathing-circle inhale';
                text.textContent = 'Inspirez...';
                instructions.textContent = `Cycle ${cycle + 1}/${totalCycles} - Inspirez lentement par le nez`;
                
                breathingTimer = setTimeout(() => {
                    // Retenez (7 secondes)
                    circle.className = 'breathing-circle hold';
                    text.textContent = 'Retenez...';
                    instructions.textContent = 'Retenez votre souffle confortablement';
                    
                    breathingTimer = setTimeout(() => {
                        // Expirez (8 secondes)
                        circle.className = 'breathing-circle exhale';
                        text.textContent = 'Expirez...';
                        instructions.textContent = 'Expirez lentement par la bouche';
                        
                        breathingTimer = setTimeout(() => {
                            cycle++;
                            breathingCycle();
                        }, 8000);
                    }, 7000);
                }, 4000);
            }
            
            breathingCycle();
        }

        function startGuidedRelaxation() {
            closeModal('relaxationModal');
            addMessage("J'aimerais faire une relaxation progressive musculaire", 'user');
            setTimeout(() => {
                const response = `Excellente idée ! La relaxation progressive de Jacobson est très efficace pour réduire les tensions physiques et mentales.

🌱 **Préparation de l'espace thérapeutique**
- Installez-vous confortablement, assis ou allongé
- Créez un environnement calme, tamisez les lumières si possible
- Fermez les yeux ou fixez un point neutre

🧠 **Principe thérapeutique**
Cette technique vous aide à distinguer tension et détente, développant votre conscience corporelle.

🦶 **Démarrage par les pieds**
Contractez tous les muscles de vos pieds pendant 5 secondes... puis relâchez complètement pendant 10 secondes. Observez la différence de sensation.

Cette différenciation tension/détente est un apprentissage important pour la gestion du stress. Souhaitez-vous que je vous guide étape par étape à travers tout votre corps ?`;
                addMessage(response, 'assistant');
            }, 1000);
        }

        function startMindfulness() {
            closeModal('relaxationModal');
            addMessage("J'aimerais pratiquer la pleine conscience", 'user');
            setTimeout(() => {
                const response = `Magnifique choix ! La pleine conscience est un outil thérapeutique puissant pour l'ancrage dans le présent.

🧠 **Objectif thérapeutique**
Développer votre capacité d'observation sans jugement, réduire les ruminations et l'anxiété anticipatoire.

🍃 **Technique du 5-4-3-2-1 (Grounding)**
Cette technique neurologique vous reconnecte au moment présent :

**5** - Nommez 5 objets que vous voyez autour de vous
**4** - Identifiez 4 sons que vous entendez
**3** - Remarquez 3 sensations tactiles (vêtements, température, texture)
**2** - Percevez 2 odeurs différentes
**1** - Goûtez quelque chose ou remarquez le goût dans votre bouche

💡 **Pourquoi ça marche ?**
Cette technique active vos sens et ramène votre système nerveux dans le présent, interrompant les cycles d'anxiété.

Comment vous sentez-vous après cet exercice ? Avez-vous remarqué un changement dans votre niveau de stress ?`;
                addMessage(response, 'assistant');
            }, 1000);
        }

        function startVisualization() {
            closeModal('relaxationModal');
            addMessage("J'aimerais faire un exercice de visualisation", 'user');
            setTimeout(() => {
                const response = `Parfait ! La visualisation thérapeutique active les mêmes circuits neuronaux que l'expérience réelle, créant un apaisement profond.

🧠 **Base neurologique**
Votre cerveau ne fait pas la différence entre une image mentale vivide et la réalité. Nous allons utiliser cela pour créer des sensations de sécurité.

🌅 **Construction de votre "lieu sûr" thérapeutique**
Fermez les yeux et laissez émerger un endroit où vous vous sentez parfaitement en sécurité et apaisé...

**Questions d'ancrage :**
- Êtes-vous à l'intérieur ou à l'extérieur ?
- Quelle est la température ? Y a-t-il une brise ?
- Quelles couleurs dominent cet espace ?
- Quels sons entendez-vous ? (oiseaux, vagues, silence...)
- Y a-t-il des odeurs particulières ?

💝 **Ancrage émotionnel**
Ressentez la sécurité et la paix de ce lieu. Cette sensation vous appartient, vous pouvez y revenir mentalement quand vous en avez besoin.

Pouvez-vous me décrire votre lieu sûr ? Cela renforcera l'ancrage thérapeutique.`;
                addMessage(response, 'assistant');
            }, 1000);
        }

        function handleKeyDown(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        }

        async function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (!message) return;

            // Add user message
            addMessage(message, 'user');
            input.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            try {
                // Call actual LLM
                const response = await callLocalLLM(message);
                hideTypingIndicator();
                addMessage(response, 'assistant');
            } catch (error) {
                hideTypingIndicator();
                addMessage("Désolé, je rencontre des difficultés techniques. Pouvez-vous réessayer dans un moment ?", 'assistant');
                console.error('LLM Error:', error);
            }
        }

        async function callLocalLLM(userMessage) {
            // Utiliser la fonction Netlify comme proxy
            const PROXY_URL = '/.netlify/functions/ollama-proxy';
            const MODEL_NAME = 'gemma2:9b';
            
            const fullPrompt = `${MENTAL_HEALTH_PROMPT}

Historique de conversation:
${conversationHistory.slice(-6).map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Utilisateur: ${userMessage}

Répondez en français de manière empathique et bienveillante.`;

            try {
                const response = await fetch(PROXY_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: MODEL_NAME,
                        prompt: fullPrompt,
                        stream: false,
                        options: {
                            temperature: 0.7,
                            top_p: 0.9,
                            max_tokens: 300
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data.response || "Je n'ai pas pu générer une réponse appropriée.";
                
            } catch (error) {
                console.error('Erreur API:', error);
                return generateFallbackResponse(userMessage);
            }
        }

        function generateFallbackResponse(userMessage) {
            const fallbackResponses = [
                "Je vous remercie de partager cela avec moi. Même si je rencontre quelques difficultés techniques, vos sentiments sont importants. Pouvez-vous me dire ce qui vous préoccupe le plus en ce moment ?",
                "J'aimerais pouvoir vous répondre plus personnellement, mais j'ai des soucis de connexion. Ce que vous ressentez est valide. Y a-t-il quelque chose de spécifique qui vous tracasse aujourd'hui ?",
                "Malgré mes difficultés techniques actuelles, je veux que vous sachiez que je suis là pour vous écouter. Voulez-vous me parler de ce qui vous amène ici aujourd'hui ?"
            ];
            return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        }

        function addMessage(content, sender) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            messageContent.textContent = content;
            
            messageDiv.appendChild(messageContent);
            messagesContainer.appendChild(messageDiv);
            
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Store in conversation history
            conversationHistory.push({role: sender === 'user' ? 'user' : 'assistant', content});
        }

        function showTypingIndicator() {
            document.getElementById('typingIndicator').style.display = 'block';
            document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
        }

        function hideTypingIndicator() {
            document.getElementById('typingIndicator').style.display = 'none';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const breathingModal = document.getElementById('breathingModal');
            const relaxationModal = document.getElementById('relaxationModal');
            if (event.target == breathingModal) {
                closeModal('breathingModal');
            }
            if (event.target == relaxationModal) {
                closeModal('relaxationModal');
            }
        }

        // Auto-resize textarea
        document.getElementById('messageInput').addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });

        // Focus input on load
        window.addEventListener('load', () => {
            document.getElementById('messageInput').focus();
        });
    </script>
</body>
</html>