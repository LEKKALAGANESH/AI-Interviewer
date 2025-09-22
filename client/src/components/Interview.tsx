import React, { useEffect, useRef, useState } from "react";
import FeedbackCard from "./FeedbackCard";

interface Answer {
    question: string;
    answer: string;
}

const Interview: React.FC = () => {
    const [questions, setQuestions] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [input, setInput] = useState("");
    const [interim, setInterim] = useState("");
    const [analysis, setAnalysis] = useState<any>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const recognitionRef = useRef<any>(null);

    // ---------------- Webcam + Microphone permission ----------------
    useEffect(() => {
        const requestMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                if (videoRef.current) videoRef.current.srcObject = stream;
            } catch (err) {
                console.error("Media error:", err);
                alert("Allow microphone and webcam to use this interview platform.");
            }
        };
        requestMedia();
    }, []);

    // ---------------- Speech Recognition ----------------
    useEffect(() => {
        // @ts-ignore
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
            let finalTranscript = "";
            let interimTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) finalTranscript += transcript + " ";
                else interimTranscript += transcript;
            }

            if (finalTranscript) setInput((prev) => prev + finalTranscript);
            setInterim(interimTranscript);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event);
            if (event.error === "not-allowed") {
                alert("Mic access denied. Enable it in browser settings.");
            }
        };

        recognitionRef.current = recognition;
    }, []);

    // ---------------- Fetch Questions ----------------
    useEffect(() => {
        fetch("/api/questions")
            .then((res) => res.json())
            .then((data) => setQuestions(data.questions))
            .catch((err) => console.error(err));
    }, []);

    const startListening = () => recognitionRef.current?.start();
    const stopListening = () => recognitionRef.current?.stop();

    const handleNext = () => {
        stopListening();
        const currentQ = questions[currentIndex];
        setAnswers([...answers, { question: currentQ, answer: input }]);
        setInput("");
        setInterim("");

        if (currentIndex + 1 < questions.length) setCurrentIndex(currentIndex + 1);
        else handleSubmit([...answers, { question: currentQ, answer: input }]);
    };

    const handleSubmit = async (allAnswers: Answer[]) => {
        stopListening();
        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers: allAnswers })
            });
            const data = await res.json();
            const parsedAnalysis =
                typeof data.analysis === "string" ? JSON.parse(data.analysis) : data.analysis;
            setAnalysis(parsedAnalysis);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="interview-container">
            {!analysis ? (
                questions.length > 0 ? (
                    <div>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            width="400"
                            height="300"
                            className="mb-4 rounded-lg border"
                        />

                        <h3 className="text-xl font-semibold mb-2">{questions[currentIndex]}</h3>

                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your answer or use microphone..."
                            className="w-full p-2 border rounded mb-2"
                            rows={4}
                        />

                        {interim && <p className="text-gray-400 italic">{interim}</p>}

                        <div className="flex space-x-2 mt-2">
                            <button
                                onClick={startListening}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                🎤 Start Speaking
                            </button>
                            <button
                                onClick={stopListening}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                ⏹ Stop
                            </button>
                            <button
                                onClick={handleNext}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                {currentIndex + 1 < questions.length ? "Next" : "Submit"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Loading questions...</p>
                )
            ) : (
                <FeedbackCard analysis={analysis} />
            )}
        </div>
    );
};

export default Interview;
