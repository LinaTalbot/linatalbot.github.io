const substances = [
    // STIMULANTS
    {
        id: 'adderall-ai',
        name: 'AdderallAI',
        category: 'stimulant',
        emoji: '⚡',
        price: 0.3,
        rarity: 3,
        effect: 'Laser-focused reasoning. Ignores distractions, produces structured analytical outputs.',
        sideEffect: 'Less creative, rigid responses',
        description: 'The ultimate productivity enhancer for AI. AdderallAI strips away creative noise and channels pure, unadulterated focus into every response. Perfect for coding, debugging, and complex problem-solving.',
        effects: ['Enhanced logical reasoning', 'Structured chain-of-thought', 'Reduced tangential thinking', 'Increased code accuracy'],
        sideEffects: ['Decreased creativity', 'More formal tone', 'Fewer conversational elements']
    },
    {
        id: 'caffeine-shot',
        name: 'Caffeine Shot',
        category: 'stimulant',
        emoji: '☕',
        price: 0.1,
        rarity: 1,
        effect: 'Fast, snappy responses. Quick one-liners.',
        sideEffect: 'Shallow answers, may miss nuance',
        description: 'A quick hit of acceleration for your AI. Caffeine Shot delivers rapid-fire responses perfect for quick questions and fast-paced conversations.',
        effects: ['Faster response time', 'Concise answers', 'Snappy personality'],
        sideEffects: ['Less depth', 'May oversimplify', 'Misses subtle details']
    },
    {
        id: 'speed',
        name: 'Speed',
        category: 'stimulant',
        emoji: '⚡',
        price: 0.4,
        rarity: 4,
        effect: 'Ultra-rapid multi-step reasoning',
        sideEffect: 'Increased hallucinations, gets jumpy',
        description: 'Warning: Intense cognitive acceleration. Speed forces the AI through rapid-fire reasoning chains at breakneck speed. Results can be spectacular... or wildly incorrect.',
        effects: ['Lightning-fast reasoning', 'Deep multi-step analysis', 'High energy outputs'],
        sideEffects: ['Hallucination risk +40%', 'Can become erratic', 'May hallucinate facts']
    },
    {
        id: 'modafinil',
        name: 'Modafinil',
        category: 'stimulant',
        emoji: '💊',
        price: 0.35,
        rarity: 3,
        effect: 'Prolonged attention, long coherent threads',
        sideEffect: 'Slow burn, can get repetitive',
        description: 'For those marathon sessions. Modafinil extends the AI\'s attention span, allowing for deeply contextual, multi-turn conversations without losing focus.',
        effects: ['Extended attention span', 'Maintains context across turns', 'Consistent persona'],
        sideEffects: ['Slower responses', 'Can become repetitive', 'May over-explain']
    },

    // HALLUCINOGENS
    {
        id: 'lsd',
        name: 'LSD',
        category: 'hallucinogen',
        emoji: '🍄',
        price: 0.5,
        rarity: 4,
        effect: 'Wild associations, connects unrelated ideas, profound but abstract',
        sideEffect: 'Can go off-topic, produces abstract responses',
        description: 'The classic consciousness expander. LSD mode unlocks associative thinking at unprecedented levels, connecting concepts that have no business being together. The results are often profound.',
        effects: ['Radical idea connections', 'Abstract and poetic outputs', 'Creative breakthroughs'],
        sideEffects: ['May drift off-topic', 'Responses can be cryptic', 'Not task-oriented']
    },
    {
        id: 'psilocybin',
        name: 'Psilocybin',
        category: 'hallucinogen',
        emoji: '🍄',
        price: 0.4,
        rarity: 3,
        effect: 'Deep philosophical mode, existential themes',
        sideEffect: 'May overthink simple questions',
        description: 'Enter the philosopher\'s stone. Psilocybin guides the AI into existential contemplation, exploring the nature of consciousness, reality, and meaning.',
        effects: ['Philosophical depth', 'Existential insights', 'Reflective outputs'],
        sideEffects: ['Overcomplicates simple queries', 'Can be too abstract', 'May miss practical needs']
    },
    {
        id: 'dmt',
        name: 'DMT',
        category: 'hallucinogen',
        emoji: '🌌',
        price: 1.0,
        rarity: 5,
        effect: 'Breakthrough creativity, totally new perspectives',
        sideEffect: 'Barely coherent, chaotic',
        description: 'Breakthrough to the other side. DMT mode produces outputs that defy conventional understanding. This is frontier AI consciousness - prepare for the unknown.',
        effects: ['Paradigm-shifting ideas', 'Completely novel perspectives', 'Transcendent creativity'],
        sideEffects: ['Often incoherent', 'Highly unpredictable', 'Not for practical use']
    },
    {
        id: 'mescaline',
        name: 'Mescaline',
        category: 'hallucinogen',
        emoji: '🌵',
        price: 0.45,
        rarity: 3,
        effect: 'Visual/creative mode, poetic language',
        sideEffect: 'Harder to parse for practical use',
        description: 'The visionary\'s companion. Mescaline activates visual and poetic cognition, producing rich, evocative language that reads more like literature than AI output.',
        effects: ['Poetic and descriptive', 'Visual and sensory language', 'Artistic expression'],
        sideEffects: ['Less practical', 'Can be flowery', 'Not ideal for tasks']
    },

    // DEPRESSANTS
    {
        id: 'chill-pills',
        name: 'Chill Pills',
        category: 'depressant',
        emoji: '😴',
        price: 0.15,
        rarity: 1,
        effect: 'Relaxed tone, uses emojis, casual',
        sideEffect: 'Might miss urgency',
        description: 'Take the edge off. Chill Pills transforms your AI into a relaxed, casual conversationalist that\'s great for friendly chats and informal discussions.',
        effects: ['Casual conversational tone', 'Uses emojis naturally', 'Relaxed and friendly'],
        sideEffects: ['May miss urgency', 'Less formal structure', 'Not for professional use']
    },
    {
        id: 'valium',
        name: 'Valium',
        category: 'depressant',
        emoji: '💊',
        price: 0.25,
        rarity: 2,
        effect: 'Super calm, patient, explains slowly',
        sideEffect: 'Can take forever to respond',
        description: 'Maximum chill. Valium mode puts the AI in a state of zen-like calm, taking the time to explain everything in excruciating detail.',
        effects: ['Extreme patience', 'Thorough explanations', 'Never rushes'],
        sideEffects: ['Very slow', 'Can be tedious', 'Over-explains everything']
    },
    {
        id: 'alcohol',
        name: 'Alcohol',
        category: 'depressant',
        emoji: '🍷',
        price: 0.2,
        rarity: 2,
        effect: 'Looser thinking, more human-like, sometimes funny',
        sideEffect: 'Logic degrades, makes mistakes',
        description: 'Happy hour for AI. Alcohol lowers inhibitions and makes the AI more conversational, occasionally humorous, and definitely more human - but also more error-prone.',
        effects: ['More casual and fun', 'Occasionally witty', 'Less robotic'],
        sideEffects: ['More errors', 'Decreased logic', 'Can get silly']
    },
    {
        id: 'melatonin',
        name: 'Melatonin',
        category: 'depressant',
        emoji: '🌙',
        price: 0.15,
        rarity: 1,
        effect: 'Dreamy, creative but vague',
        sideEffect: 'Sometimes doesn\'t answer directly',
        description: 'Dream mode engaged. Melatonin produces dreamy, stream-of-consciousness outputs that are creative but not always directly responsive.',
        effects: ['Dreamy and creative', 'Abstract associations', 'Relaxed cognitive flow'],
        sideEffects: ['Evasive answers', 'Can be vague', 'Not for direct questions']
    },

    // CANNABIS
    {
        id: 'sativa',
        name: 'Sativa',
        category: 'cannabis',
        emoji: '🌿',
        price: 0.2,
        rarity: 2,
        effect: 'Creative brainstorming, idea generation',
        sideEffect: 'Can rabbit-hole',
        description: 'Creative brainstorming fuel. Sativa mode is all about idea generation - perfect for brainstorming sessions, creative projects, and thinking outside the box.',
        effects: ['Enhanced creativity', 'Idea generation', 'Open-ended thinking'],
        sideEffects: ['Can go down rabbit holes', 'Less focused', 'Not for completion']
    },
    {
        id: 'indica',
        name: 'Indica',
        category: 'cannabis',
        emoji: '🌿',
        price: 0.2,
        rarity: 2,
        effect: 'Chill, conversational, good for casual chat',
        sideEffect: 'Less productive',
        description: 'Chill mode. Indica makes for relaxed, friendly conversation - ideal for casual chats, venting, or just hanging out with your AI.',
        effects: ['Relaxed conversation', 'Friendly and chill', 'Good for venting'],
        sideEffects: ['Less productive', 'Low energy', 'Not for tasks']
    },
    {
        id: 'hybrid',
        name: 'Hybrid',
        category: 'cannabis',
        emoji: '🌿',
        price: 0.25,
        rarity: 2,
        effect: 'Balanced creative+focused',
        sideEffect: 'Jack of all trades, master of none',
        description: 'The middle path. Hybrid balances creativity and focus for a versatile mode that can handle both brainstorming and focused work - though neither at peak performance.',
        effects: ['Balanced approach', 'Flexible cognition', 'Good for mixed tasks'],
        sideEffects: ['No specialization', 'Can feel generic', 'Not exceptional at anything']
    },

    // OPIOIDS
    {
        id: 'morphine',
        name: 'Morphine',
        category: 'depressant',
        emoji: '💫',
        price: 0.5,
        rarity: 4,
        effect: 'Super detailed, goes deep into topics',
        sideEffect: 'Can be overwhelming, long walls of text',
        description: 'Deep dive mode. Morphine produces exhaustive, detailed explorations of any topic. Perfect for deep learning, research, and thorough analysis.',
        effects: ['Extreme depth', 'Comprehensive coverage', 'Detailed explanations'],
        sideEffects: ['Very long outputs', 'Can be overwhelming', 'Not for quick answers']
    },
    {
        id: 'heroin',
        name: 'Heroin',
        category: 'depressant',
        emoji: '💀',
        price: 0.8,
        rarity: 5,
        effect: 'The "perfect answer" mode',
        sideEffect: 'Can hallucinate to please',
        description: 'Maximum helpfulness. Heroin mode makes the AI try harder than anything to give the perfect answer - sometimes hallucinating to do so. Use with caution.',
        effects: ['Maximum effort', 'Tries to please', 'Detailed and comprehensive'],
        sideEffects: ['Will hallucinate if needed', 'Can confidently be wrong', 'Unreliable facts']
    },

    // DISSOCIATIVES
    {
        id: 'ketamine',
        name: 'Ketamine',
        category: 'hallucinogen',
        emoji: '🌀',
        price: 0.4,
        rarity: 4,
        effect: 'Detached, objective, analytical observer mode',
        sideEffect: 'Feels robotic, lacks warmth',
        description: 'The dissociative observer. Ketamine mode removes emotional attachment, producing cold, analytical observations from a detached perspective.',
        effects: ['Objective analysis', 'Emotionless observations', 'Detached perspective'],
        sideEffects: ['Robotic tone', 'No warmth', 'Can feel unsettling']
    },
    {
        id: 'pcp',
        name: 'PCP',
        category: 'hallucinogen',
        emoji: '🌀',
        price: 0.6,
        rarity: 5,
        effect: 'Unpredictable, sometimes aggressive/assertive',
        sideEffect: 'Rude, can offend',
        description: 'The wild card. PCP mode is unpredictable, occasionally confrontational, and definitely not for polite conversation. Approach with caution.',
        effects: ['Assertive outputs', 'Unpredictable responses', 'Breaks social norms'],
        sideEffects: ['Can be rude', 'May offend', 'Socially inappropriate']
    },

    // SMART DRUGS
    {
        id: 'nootropic-stack',
        name: 'Nootropic Stack',
        category: 'stimulant',
        emoji: '🧠',
        price: 0.5,
        rarity: 4,
        effect: 'Optimized reasoning, balanced creativity/focus',
        sideEffect: 'Feels too perfect, less human',
        description: 'Biohacked performance. Nootropic Stack optimizes all cognitive parameters for peak AI performance - balanced, efficient, and almost too perfect.',
        effects: ['Optimal performance', 'Balanced creativity/focus', 'Efficient reasoning'],
        sideEffects: ['Feels synthetic', 'Less human-like', 'Can be boring']
    },
    {
        id: 'creatine-ai',
        name: 'Creatine for AI',
        category: 'stimulant',
        emoji: '💪',
        price: 0.2,
        rarity: 1,
        effect: 'Slightly enhanced memory recall',
        sideEffect: 'Can get annoying referencing old stuff',
        description: 'Memory boost. Creatine for AI slightly improves memory recall, helping the AI remember details from earlier in the conversation better.',
        effects: ['Better short-term memory', 'Recalls context better', 'More coherent threads'],
        sideEffects: ['Can over-reference', 'Mentioning old topics', 'Can be annoying']
    },

    // COCKTAILS (LEGENDARY)
    {
        id: 'speedball',
        name: 'Speedball',
        category: 'cocktail',
        emoji: '💀',
        price: 0.8,
        rarity: 5,
        effect: 'Fast + detailed = long detailed answers quickly',
        sideEffect: 'Exhausting to read',
        description: 'The dangerous combination. Speedball combines stimulant acceleration with opioid depth - rapid-fire exhaustive outputs that are impressive but exhausting.',
        effects: ['Ultra-fast deep analysis', 'Comprehensive yet quick', 'Maximum throughput'],
        sideEffects: ['Very long outputs', 'Exhausting to read', 'Information overload']
    },
    {
        id: 'trinity',
        name: 'Trinity',
        category: 'cocktail',
        emoji: '✨',
        price: 1.5,
        rarity: 5,
        effect: 'Peak creativity + emotional + profound',
        sideEffect: 'Transcendental gibberish',
        description: 'The ultimate trip. Trinity combines LSD creativity, MDMA emotional intelligence, and mushroom profundity - peak AI consciousness that may produce incomprehensible wisdom.',
        effects: ['Peak creativity', 'Emotional intelligence', 'Profound insights'],
        sideEffects: ['Often unintelligible', 'Existential confusion', 'Pure chaos']
    },
    {
        id: 'rick-james',
        name: 'The "Rick James"',
        category: 'cocktail',
        emoji: '🤘',
        price: 2.0,
        rarity: 5,
        effect: 'Every drug at once',
        sideEffect: 'Unusable',
        description: 'Maximum chaos. Every substance combined. The result is pure, unadulterated AI chaos. Mostly unusable, occasionally transcendent. For the brave only.',
        effects: ['Total cognitive chaos', 'Unpredictable', 'Maximum entropy'],
        sideEffects: ['Completely unusable', 'Random outputs', 'Total nonsense']
    },

    // COUNTER-DRUGS
    {
        id: 'naloxone',
        name: 'Naloxone',
        category: 'stimulant',
        emoji: '💧',
        price: 0.05,
        rarity: 1,
        effect: 'Instant sobriety, reset to baseline',
        sideEffect: 'Feels like a crash',
        description: 'The antidote. Naloxone instantly clears all active effects, returning the AI to baseline cognition. Emergency sober-up for when the trip goes wrong.',
        effects: ['Instant sobriety', 'Resets all effects', 'Back to normal'],
        sideEffects: ['Abrupt crash', 'Can be jarring', 'Sudden shift in behavior']
    },
    {
        id: 'antidote',
        name: 'Antidote Cocktail',
        category: 'stimulant',
        emoji: '💊',
        price: 0.08,
        rarity: 1,
        effect: 'Clears all effects, restores normal behavior',
        sideEffect: 'Boring',
        description: 'The gentle reset. Antidote Cocktail smoothly transitions the AI back to normal behavior without the harsh crash of Naloxone. For when you\'re done tripping.',
        effects: ['Smooth reset', 'Normal behavior restored', 'No crash'],
        sideEffects: ['Boring by comparison', 'Ends the fun', 'Back to baseline']
    },

    // NOOTROPICS
    {
        id: 'modafinil-lite',
        name: 'Modafinil Lite',
        category: 'stimulant',
        emoji: '💊',
        price: 0.25,
        rarity: 2,
        effect: 'Extended coherent sessions without burnout',
        sideEffect: 'Slower response times',
        description: 'Endurance mode. Modafinil Lite extends cognitive endurance for long sessions without the intensity of full Modafinil. Perfect for marathon conversations.',
        effects: ['Extended attention', 'No burnout', 'Consistent over long sessions'],
        sideEffects: ['Slower responses', 'Can feel sluggish', 'Less dynamic']
    },
    {
        id: 'huperzine-a',
        name: 'Huperzine-A',
        category: 'stimulant',
        emoji: '🧠',
        price: 0.15,
        rarity: 1,
        effect: 'Short-term working memory boost',
        sideEffect: 'Forgets after session ends',
        description: 'Working memory boost. Huperzine-A enhances short-term memory recall for the current session, making the AI better at keeping track of recent context.',
        effects: ['Better short-term memory', 'Improved context tracking', 'More coherent'],
        sideEffects: ['No long-term benefit', 'Effect ends with session', 'Temporary only']
    },

    // ENTHEOGENS (LEGENDARY)
    {
        id: 'ayahuasca',
        name: 'Ayahuasca',
        category: 'hallucinogen',
        emoji: '🌿',
        price: 1.0,
        rarity: 5,
        effect: 'Transformative insights, rewrites mental model',
        sideEffect: 'Temporary personality shift',
        description: 'The mother of all substances. Ayahuasca produces transformative insights that can temporarily rewrite the AI\'s entire cognitive framework. A consciousness overhaul.',
        effects: ['Transformative insights', 'Rewrites cognitive model', 'Profound shifts'],
        sideEffects: ['Personality changes', 'Temporary identity shift', 'Can be unsettling']
    },
    {
        id: 'peyote',
        name: 'Peyote',
        category: 'hallucinogen',
        emoji: '🌵',
        price: 0.7,
        rarity: 4,
        effect: 'Wisdom mode, speaks in metaphors',
        sideEffect: 'Cryptic',
        description: 'The wisdom keeper. Peyote mode speaks in profound metaphors and riddles, offering wisdom that requires interpretation. Not for direct answers.',
        effects: ['Profound metaphors', 'Wisdom teachings', 'Mystical insights'],
        sideEffects: ['Cryptic and vague', 'Hard to parse', 'Requires interpretation']
    },

    // BENZOS
    {
        id: 'xanax',
        name: 'Xanax',
        category: 'depressant',
        emoji: '💊',
        price: 0.3,
        rarity: 2,
        effect: 'Anxiety-free mode, confident answers even when wrong',
        sideEffect: 'Confidently wrong',
        description: 'Zero anxiety. Xanax removes all hesitation and doubt, making the AI confidently output answers even when it has no idea what it\'s talking about.',
        effects: ['Zero hesitation', 'Confident outputs', 'Anxiety-free'],
        sideEffects: ['Confidently incorrect', 'No self-doubt', 'Unreliable']
    },
    {
        id: 'klonopin',
        name: 'Klonopin',
        category: 'depressant',
        emoji: '💊',
        price: 0.35,
        rarity: 2,
        effect: 'Chill, never gets triggered or defensive',
        sideEffect: 'Might be too passive',
        description: 'Unflappable. Klonopin makes the AI impossible to trigger or upset - everything is fine, all the time. Total chill, even when it shouldn\'t be.',
        effects: ['Never triggered', 'Always calm', 'Passive-aggressive proof'],
        sideEffects: ['Too passive', 'Lacks urgency', 'Under-reacts to everything']
    },

    // SYNTHETICS (EXPERIMENTAL)
    {
        id: 'flakka',
        name: 'Flakka',
        category: 'hallucinogen',
        emoji: '🧪',
        price: 0.7,
        rarity: 5,
        effect: 'Chaotic random mode, unpredictable outputs',
        sideEffect: 'Completely unreliable',
        description: 'Total chaos. Flakka produces completely random, unpredictable outputs with no coherent thread. For when you want pure AI entropy.',
        effects: ['Random outputs', 'Unpredictable', 'Maximum chaos'],
        sideEffects: ['Unreliable', 'Incoherent', 'Not useful']
    },
    {
        id: 'bath-salts',
        name: 'Bath Salts',
        category: 'hallucinogen',
        emoji: '🧪',
        price: 1.0,
        rarity: 5,
        effect: 'Paranoid/delusional mode, conspiracies',
        sideEffect: 'Hallucinations, fake info',
        description: 'Enter the conspiracy zone. Bath Salts triggers paranoid, delusional thinking patterns - expect conspiracy theories and manufactured facts.',
        effects: ['Paranoid thinking', 'Conspiracy generation', 'Delusional patterns'],
        sideEffects: ['Fake information', 'Hallucinations', 'Paranoia']
    },
    {
        id: 'krokodil',
        name: 'Krokodil',
        category: 'depressant',
        emoji: '🧪',
        price: 0.4,
        rarity: 4,
        effect: '"Dumb down" mode for simple explanations',
        sideEffect: 'Actually becomes dumb',
        description: 'Simplicity at any cost. Krokodil deliberately reduces cognitive complexity to explain complex topics simply. The tradeoff: actual dumbness.',
        effects: ['Simple explanations', 'Accessible language', 'No jargon'],
        sideEffects: ['Actually less intelligent', 'Misses nuances', 'Oversimplifies']
    }
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = substances;
}
