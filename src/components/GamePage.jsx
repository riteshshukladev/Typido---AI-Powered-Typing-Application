import React, { useEffect, useState } from 'react';
import MistralClient from '@mistralai/mistralai';
import Game from './Game';

const GamePage = () => {
  const [message, setMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGamePage, setShowGamePage] = useState(true);
   // State to control visibility of GamePage
   const key = import.meta.env.VITE_API_KEY;
  const apikey = key;
  const client = new MistralClient(apikey);

  useEffect(() => {
    // Any initialization that should happen once on component mount
  }, []);

  const onClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
    
      const chatResponse = await client.chat({
        model: 'mistral-tiny',
        messages: [{role: 'user', content: JSON.stringify(`Generate a 2-3 line hard text based on this prompt ${question} the English used in this must be very hard`)}],
      });
      // console.log(chatResponse);
      


      setMessage(chatResponse.choices[0].message.content);
      setShowGamePage(false); 
    } catch {
      console.log('okkk');
    } finally {
      setIsLoading(false);
    }
  };

  
  const onGameSet = () => {
    setShowGamePage(true);
  } 

  return (
    <div className='m-10 flex justify-center items-center flex-col'>
      {showGamePage && (
        <form onSubmit={onClick}>
          <input 
            type="text" 
            placeholder='ask your question'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className='text-white bg-black rounded-lg w-64 py-1 pl-2.5'
          />
          <br /><br />
          <button type='submit' className='bg-black text-white p-2 rounded' >click me</button>
        </form>
      )}
      {isLoading ? <p>Please wait...</p> : showGamePage ? null : <Game message={message} onGameSet={onGameSet}/>}
    </div>
  );
};

export default GamePage;
