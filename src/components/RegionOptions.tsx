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
  display: flex;
`;

const NameLabel = styled.p`
  padding: 0.25rem;
  flex: 1;
`

const Actions = styled.div`
  margin-left: auto;
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
          <Action onClick={() => onDeleteClick(data.index)}>🗑</Action>
          <Action onClick={() => onEditClick(data.index)}>✏️</Action>
        </Actions>
      </>
    )}
  </StyledRegionOptions>
);

export default RegionOptions