import * as React from 'react';
import styled, { keyframes } from '../styled-components';

const cellSize = 128
const numLines = 8
const lineWeight = 2
const gridStops = `
  magenta 0,
  magenta ${(lineWeight/2)}px,
  transparent ${(lineWeight/2)}px,
  transparent ${(cellSize/2) - (lineWeight/2)}px,
  magenta ${(cellSize/2) - (lineWeight/2)}px,
  magenta ${(cellSize/2)}px
`
const GridContainer = styled.div`
  display: block;
  position: absolute;
  z-index: -100;
  opacity:.5;
  height: ${cellSize*numLines}px;
  width: 100%;
  overflow: hidden;
  bottom: 0;

`
const GridBottom = styled.div`
  position: absolute;
  transform: scale(3,1) perspective(100vh) rotateX(75deg) ;
  perspective-origin: 100%;
  transform-origin: bottom center;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  box-shadow: 0 ${cellSize/-4}px ${cellSize}px magenta;
  border-top: 2px solid magenta;

  ::before,
  ::after {
    content: '';
    position: absolute;
    display: block;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  ::before {
    content: '';
    left:0;
    right: 50vw;
    background: repeating-linear-gradient(
      to left,
      ${gridStops}
    );
  }
  ::after {
    content: '';
    left: 50vw;
    right: 0;
    background: repeating-linear-gradient(
      to right,
      ${gridStops}
    );
  }
`

const gridMove = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(${cellSize}px);
  }
}`

const GridRule = styled.hr`
  width: 100%;
  will-change: transform;
  animation: .6s ${gridMove} linear infinite;
  display: block;
  border: ${(lineWeight*2)}px solid magenta;
  margin-bottom: ${cellSize - lineWeight*4}px;
`

const GridRider = () => {
  const lineArray = Array(8).fill(0);
  return <GridContainer>
    <GridBottom>
      {
        lineArray.map((item, index) => (
          <GridRule key={index} />
        ))
      }
    </GridBottom>
  </GridContainer>
}

export default GridRider
