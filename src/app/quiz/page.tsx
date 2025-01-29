'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface QuizData {
  users: Array<{
    name: string;
    picture: string | null;
  }>;
  correctUserIndex: number;
  userInfo: string[];
}

export default function QuizPage() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  const fetchNewQuiz = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/quiz');
      const data = await response.json();
      if ('error' in data) {
        throw new Error(data.error);
      }
      setQuizData(data);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewQuiz();
  }, []);

  const handleAnswer = (index: number) => {
    if (!quizData) return;
    
    setSelectedAnswer(index);
    const correct = index === quizData.correctUserIndex;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setTimeout(fetchNewQuiz, 1000);
    } else {
      setStreak(0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 text-gray-600">Loading quiz...</div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 text-gray-600">Failed to load quiz</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4 pt-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz</h1>
          <p className="text-lg text-gray-600">Test your DALI member knowledge</p>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-gray-900">Score:</span>
            <span className="text-lg font-bold text-gray-900">{score}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-gray-900">Streak:</span>
            <span className="text-lg font-bold text-gray-900">{streak}</span>
            {streak > 0 && <span className="text-2xl">🔥</span>}
          </div>
        </div>
        
        <Card className="mb-6 shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Who is this person?</h2>
            <div className="space-y-3">
              {quizData.userInfo.map((info, index) => (
                <p key={index} className="text-gray-600 text-lg">{info}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quizData.users.map((user, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isCorrect !== null && index !== quizData.correctUserIndex}
              variant={
                selectedAnswer === index
                  ? isCorrect
                    ? 'default'
                    : 'destructive'
                  : 'outline'
              }
              className={`
                p-4 h-auto w-full transition-all duration-200
                ${selectedAnswer === index && isCorrect
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : selectedAnswer === index
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'hover:bg-gray-100'
                }
                ${isCorrect !== null && index !== quizData.correctUserIndex ? 'opacity-50' : ''}
              `}
            >
              <div className="flex items-center justify-center gap-3">
                {user.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                )}
                <span className="text-lg font-medium">{user.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </main>
  );
}