import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import {useSetRecoilState, useRecoilValue} from 'recoil'
import {Resizable} from './Resizable'
import {elementState, selectedElementIdState, isSelectedState} from './state'
import {Draggable} from './Draggable'

const Container = styled.div<{mouseDown: boolean; isSelected: boolean}>`
    position: absolute;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    border-radius: 20px;
    width: 200px;
    height: 170px;
    backdrop-filter: blur(10px);
    transition: 0.1s transform ease-out, 0.1s box-shadow ease-out, 0.1s border-color ease-out;
    border: 1px solid ${(props) => (props.isSelected ? '#18adfc' : 'transparent')};
    box-sizing: border-box;

    ${(props) =>
        props.mouseDown &&
        css`
            transform: scale(1.2);
            box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.2);
        `}
`

const InnerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 20px;
`

type ElementProps = {
    id: number
    style?: React.CSSProperties
}

export const ElementContainer: React.FC<ElementProps> = ({id, style, children}) => {
    const element = useRecoilValue(elementState(id))
    const [mouseDown, setMouseDown] = useState(false)
    const setSelectedElement = useSetRecoilState(selectedElementIdState)
    const isSelected = useRecoilValue(isSelectedState(id))

    return (
        <Resizable id={id}>
            <Container
                style={{...element.style, ...style}}
                mouseDown={mouseDown}
                isSelected={isSelected}
                onMouseDown={() => setSelectedElement(id)}
            >
                <Draggable id={id} mouseDown={mouseDown} setMouseDown={setMouseDown}>
                    <InnerContainer>{children}</InnerContainer>
                </Draggable>
            </Container>
        </Resizable>
    )
}
