import * as React from 'react'
import styled from '../styled-components';
import { RegionData } from './ImageEditor'

export interface RegionOptionsProps {
  data: RegionData
  isChanging: boolean
  onEditClick: Function
  onDeleteClick: Function
}

const StyledRegionOptions = styled.div`
  cursor: default;
  pointer-events: none;
  text-align: left;
  background-color: #fff;
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
`;

const NameLabel = styled.p`
  padding: 0.25rem;
  flex: 1;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

const Action = styled.button`
  display: inline-block;
  padding: 0.25rem;
  pointer-events: all;
  background-color: transparent;
  border: none;
`

const RegionOptions = ({ data, isChanging, onEditClick, onDeleteClick }: RegionOptionsProps) => (
  <StyledRegionOptions>
    {!isChanging && data.name && (
      <>
        <NameLabel>{data.name}</NameLabel>
        <Actions key={data.index}>
          <Action onClick={() => onDeleteClick(data.index)}>
            <span className="a11y-sr-only">Delete</span>
            <span className="silencio">🗑</span>
          </Action>
          <Action onClick={() => onEditClick(data.index)}>
            <span className="a11y-sr-only">Edit</span>
            <span className="silencio">✏️</span>
          </Action>
        </Actions>
      </>
    )}
  </StyledRegionOptions>
);

export default RegionOptions
