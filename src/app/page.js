'use client'
import { useState } from "react";

export default function Home() {
  const [flashcards, setFlashcards] = useState([])
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)

  const generateFlashCards = async (event) => {
    event.preventDefault()
    setLoading(true)
    const response = await fetch('/api/word-gen',{
      method: 'POST', 
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        topic: topic,
        blablabla: 'blablabla'
      })
    })

    const flashcardsData = await response.json()
    setFlashcards(flashcardsData)
    setLoading(false)

  }


  return (
    <form onSubmit={generateFlashCards} className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl"> Create Flash Cards by OpenAI </h1>
      <input type="text" placeholder="กรอกหัวข้อ Flash Card"
      name="topic"
      onChange={(event) => setTopic(event.target.value)}
      value={topic}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading..' : 'สร้าง Flash Card'}
        </button>
      คุณเลือกหัวข้อ {topic}
      {flashcards ? <div className="flex flec-wrap">
        {flashcards.map((flashcard) => (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">{flashcard.word}</h2>
            </div>
        ) )}
      </div> : ''}
    </form>
  );
}
