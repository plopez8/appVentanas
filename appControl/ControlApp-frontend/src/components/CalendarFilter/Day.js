import React from 'react';
import styled from 'styled-components';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Dday = styled.div`
    position: absolute;
    left: 2vw;
    top: 135px;
    width: 220px;
    display: flex;
    justify-content: space-between;
    aling-items: center;
`;
const Pday = styled.p`
    margin: auto 0;
    font-size: 1.5em;
    color: #2b7bfc;
`;
const ButtonSvg = styled.button`
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    aling-items: center;
    margin: auto 0;
    cursor: pointer;
    svg {
        font-size: medium;
        color: #2b7bfc;
    }
`;

export class Day extends React.Component {
    getDate() {
        return this.props.date;
    }

    printDate = (date) => {
        const DIA_SETMANA = [
            'Diumenge',
            'Dilluns',
            'Dimarts',
            'Dimecres',
            'Dijous',
            'Divendres',
            'Dissabte',
        ];
        return `${DIA_SETMANA[date.getDay()]}, ${date.getDate()}`;
    };

    render() {
        return (
            <Dday>
                <ButtonSvg
                    type="submit"
                    onClick={() => this.props.changeDay(-1)}
                >
                    {' '}
                    <FaChevronLeft />{' '}
                </ButtonSvg>
                <Pday>{this.printDate(this.getDate())}</Pday>
                <ButtonSvg
                    type="submit"
                    onClick={() => this.props.changeDay(1)}
                >
                    {' '}
                    <FaChevronRight />{' '}
                </ButtonSvg>
            </Dday>
        );
    }
}
