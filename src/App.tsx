import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import Hammer from 'hammerjs';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ReactImageFallback from 'react-image-fallback';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import CircularProgress from '@mui/material/CircularProgress';
import ShowMoreText from 'react-show-more-text';
import config from './card.config';

let count = 0;
function App() {
  const [currentCard, setCurrentCard] = useState(config.data[count]);
  const [text, setText] = useState('');
  const cardRef = useRef(null);
  const tinderContainer = useRef(null);
  useEffect(() => {
    const endpoint = '/get_text';
    fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setText(data.insult);
      })
      .catch((error) => {
        console.log('There was a problem with the fetch operation:' + error.message);
      });
  }, [count]);

  const generateNewCard = () => {
    const card = cardRef.current;
    card.style.opacity = 0;
    setTimeout(() => {
      card.style.transform = '';
    }, 200);
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = 'scale(1)';

      setCurrentCard(config.data[(++count) % config.data.length]);
    }, 500);
  };

  useEffect(() => {
    const card = cardRef.current! as HTMLElement;
    const hammertime = new Hammer(card);
    hammertime.on('pan', (event) => {
      card.classList.add('moving');

      if (event.deltaX === 0) return;
      if (event.center.x === 0 && event.center.y === 0) return;

      tinderContainer.current.classList.toggle('tinder_love', event.deltaX > 0);
      tinderContainer.current.classList.toggle('tinder_nope', event.deltaX < 0);

      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
    });
  }, []);

  useEffect(() => {
    const card = cardRef.current! as HTMLElement;
    const hammertime = new Hammer(card);
    hammertime.on('panend', (event) => {
      card.classList.remove('moving');
      tinderContainer.current.classList.remove('tinder_love');
      tinderContainer.current.classList.remove('tinder_nope');
      const moveOutWidth = document.body.clientWidth;
      const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
      if (!keep) {
        const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        const toX = event.deltaX > 0 ? endX : -endX;
        const endY = Math.abs(event.velocityY) * moveOutWidth;
        const toY = event.deltaY > 0 ? endY : -endY;
        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;
        event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      }
      generateNewCard();
    });
  }, []);

  const buttonHandleClick = (love) => {
    const card = cardRef.current! as HTMLElement;
    const moveOutWidth = document.body.clientWidth * 1.5;
    if (love) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }
    generateNewCard();
  };

  return (
    <div className="App">
      <div className="tinder loaded p-5" ref={tinderContainer}>
        <div className="tinder--status">
          <FavoriteIcon fontSize="large" style={{ color: '#FFACE4' }} />
          <ClearIcon fontSize="large" style={{ color: '#CDD6DD' }} />
        </div>
        <div className="tinder--cards d-flex justify-content-center flex-column align-items-center">
          <div className="tinder--card" ref={cardRef}>
            <ReactImageFallback
              src={currentCard.img}
              fallbackImage={<BrokenImageIcon />}
              initialImage={
                (
                  <div className="w-100 h-100 mt-4 d-flex justify-content-center">
                    <CircularProgress style={{ color: '#CDD6DD' }} disableShrink />
                  </div>
                )
              }
              className="d-flex justify-content-center"
            />
            <h3>{currentCard.name}</h3>
            <ShowMoreText
              /* Default options */
              lines={3}
              more="Читать ещё"
              less="Свернуть"
              expanded={false}
              width={280}
              truncatedEndingComponent="... "
            >
              {text}
            </ShowMoreText>
          </div>
          <div className="mt-4 tinder--buttons d-flex flex-row">
            <IconButton onClick={() => {
              buttonHandleClick(false);
            }}
            >
              <ClearIcon fontSize="large" style={{ color: '#CDD6DD' }} />
            </IconButton>
            <IconButton onClick={() => {
              buttonHandleClick(true);
            }}
            >
              <FavoriteIcon fontSize="large" style={{ color: '#FFACE4' }} />
            </IconButton>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
