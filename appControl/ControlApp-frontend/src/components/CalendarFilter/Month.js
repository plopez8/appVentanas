import React from 'react';
import styled from 'styled-components';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 4%;
`;
const ButtonFilter = styled.button`
    padding: 0 2vw;
    height: 30px;
    border-radius: 30px;
    font-size: small;
    border: none;
    color: #575757;
    background-color: #f2f2f2;
    &.active {
        color: #2b7bfc;
        background-color: #d3e1f8;
    }
`;
const ChangeMonth = styled.div`
    position: relative;
    height: 45px;
    width: 20vw;
    min-width: 200px;
    max-width: 300px;
    border-radius: 30px;
    background-color: #2b7bfc;
    color: white;
    font-weight: 600 !important;

    display: flex;
    align-items: center;
    justify-content: space-around;

    > * {
        margin: 0;
    }
    button {
        position: absolute;
        height: 100%;
        width: 30px;
        background: none;
        border: none;
        svg {
            font-size: x-small;
            color: white;
        }
    }
    button:nth-child(1) {
        left: 10px;
    } // == position fixed
    button:nth-child(3) {
        right: 10px;
    } // == position fixed
`;

export class Month extends React.Component {
    getDate() {
        return this.props.date;
    }

    getType() {
        return this.props.type;
    }

    printDate = (date) => {
        const month = date.getMonth();
        const year = date.getFullYear();

        const MONTH_NAMES = [
            'Gener',
            'Febrer',
            'Març',
            'Abril',
            'Maig',
            'Juny',
            'Juliol',
            'Agost',
            'Septembre',
            'Octubre',
            'Novembre',
            'Desembre',
        ];
        return `${MONTH_NAMES[month]}, ${year}`;
    };

    setActive = (event, type, btnType) => {
        const button = event.target;
        if (!button.classList.contains('active')) {
            document
                .querySelectorAll('.btn_filter.active')
                .forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');
        }

        switch (type) {
            case 'abcences':
                this.filterAbcences(btnType);
                break;
            case 'torns':
                this.filterTorns(btnType);
                break;
            default:
                break;
        }
    };

    filterAbcences = (button) => {
        if (button === 'all')
            document
                .querySelectorAll('.vacances, .abcencia, .festes')
                .forEach((btn) => btn.classList.remove('hide'));
        else {
            document
                .querySelectorAll('.vacances, .abcencia, .festes')
                .forEach((btn) => btn.classList.add('hide'));
            document
                .querySelectorAll(button)
                .forEach((btn) => btn.classList.remove('hide'));
        }
    };


    filterTorns = (type) => {
        if (type === 'setmana') {
            document.querySelector('.matrix.month').classList.add('hide');
            document.querySelector('.matrix.week').classList.remove('hide');
        } else {
            document.querySelector('.matrix.week').classList.add('hide');
            document.querySelector('.matrix.month').classList.remove('hide');
        }
    };


    defaultBtns = () => (
        <>
            <ButtonFilter
                className="btn_filter active"
                type="submit"
                onClick={(event) => this.setActive(event)}
            >
                Avui
            </ButtonFilter>
            <ButtonFilter
                className="btn_filter"
                type="submit"
                onClick={(event) => this.setActive(event)}
            >
                Setmana
            </ButtonFilter>
            <ButtonFilter
                className="btn_filter"
                type="submit"
                onClick={(event) => this.setActive(event)}
            >
                Mes
            </ButtonFilter>
        </>
    );


    matrixTornsBtns = () => (
        <>
            <ButtonFilter
                className="btn_filter active"
                type="submit"
                name="setmana"
                onClick={(event) => this.setActive(event, 'torns', 'setmana')}
            >
                Setmana
            </ButtonFilter>
            <ButtonFilter
                className="btn_filter"
                type="submit"
                name="mes"
                onClick={(event) => this.setActive(event, 'torns', 'mes')}
            >
                Mes
            </ButtonFilter>
        </>
    );


    matrixBtns = () => (
        <>
            <ButtonFilter
                className="btn_filter active"
                type="submit"
                onClick={(event) => this.setActive(event, 'abcences', 'all')}
            >
                Tot
            </ButtonFilter>
            <ButtonFilter
                className="btn_filter"
                type="submit"
                onClick={(event) =>
                    this.setActive(event, 'abcences', '.vacances')
                }
            >
                Vacances
            </ButtonFilter>
            <ButtonFilter
                className="btn_filter"
                type="submit"
                onClick={(event) =>
                    this.setActive(event, 'abcences', '.abcencia')
                }
            >
                Abcències
            </ButtonFilter>
            <ButtonFilter
                className="btn_filter"
                type="submit"
                onClick={(event) =>
                    this.setActive(event, 'abcences', '.festes')
                }
            >
                Festes
            </ButtonFilter>
        </>
        
    );

    filterBtns = () => {
        const type = this.getType();
        let component;
        switch (type) {
            case 'matrix':
                component = this.matrixBtns();
                break;
            case 'matrix-torns':
                component = this.matrixTornsBtns();
                break;
            default:
                component = this.defaultBtns();
                break;
        }
        return component;
    };

    changeDate(num) {
        const btn = document.querySelector('.btns_month button.active');
        switch (btn.name) {
            case 'dia':
                this.props.changeDay(num);
                break;
            case 'setmana':
                this.props.changeWeek(num);
                break;
            default:
                this.props.changeMonth(num);
                break;
        }
    }

    render() {
        return (
            <Buttons className="btns_month">
                <ChangeMonth>
                    <button type="submit" onClick={() => this.changeDate(-1)}>
                        <FaChevronLeft></FaChevronLeft>
                    </button>
                    <p>{this.printDate(this.getDate())}</p>
                    <button type="submit" onClick={() => this.changeDate(1)}>
                        <FaChevronRight></FaChevronRight>
                    </button>
                </ChangeMonth>
                {this.filterBtns()}
            </Buttons>
        );
    }
}
