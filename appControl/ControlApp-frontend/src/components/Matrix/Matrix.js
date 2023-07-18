import React from 'react';
import styled from 'styled-components';

const MatrixBox = styled.div`
    position: absolute;
    @media (max-width: 1335px) {
        top: 10vh;
    }
    top: 6vh;
    left: calc(-2vw - 15px);

    width: calc(100% + 45px + 4vw);
    overflow-x: scroll;
    transform: translateX(-15px);
    margin-top: 6vh;

    ul {
        display: inline-block;
        margin: 0;
        padding: 0;
        padding-bottom: 4vh;
    }

    &.hide {
        display: none;
    }
`;
const MatrixRow = styled.li`
    position: relative;
    list-style: none;
    display: flex;
    border-bottom: 1px solid #2b7bfc30;

    &:nth-child(2n + 1) {
        background-color: #2b7bfc08;
    }

    &:nth-child(2n + 1) > div:nth-child(1) {
        background-color: #f0f3f8 !important;
        z-index: 1;
    }
    &:nth-child(2n) > div:nth-child(1) {
        background-color: #f7f7f8;
        z-index: 1;
    }

    > div:nth-child(1) {
        position: sticky;
        left: 0;
        min-width: 160px;
        border-right: 1px solid #2b7bfc30;

        h3 {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    &:nth-child(1) {
        background-color: unset;
        border-top: none;
    }
    &:nth-child(1) > div {
        height: 60px !important;
        background-color: unset !important;
    }
    &:nth-child(1) > div:nth-child(1) {
        background-color: #f7f7f8 !important;
        border-right: none;
    }
`;

const Element = styled.div`
    position: relative;
    width: 40px;
    height: 46px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    & > *{ margin: 0; padding: 0;}
    & > p 
    {
        color: #afdbf0; 
        line-height: 3vh;
        margin: 0 auto;
    }
    & > h3 
    {
        color: #2B7BFC; 
        font-size: small; 
        line-height: 4vh; 
        font-weight: bold; 
        font-size: .9em;
    }

    &.holiday::before
    {
        content '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #2B7BFC08;
        z-index: -1;
    }
`;
const ElementWeek = styled.div`
    position: relative;
    width: 94px;
    height: 46px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    & > *{ margin: 0; padding: 0;}
    & > p 
    {
        color: #afdbf0; 
        line-height: 3vh;
        margin: 0 auto;
    }
    & > h3 
    {
        color: #2B7BFC; 
        font-size: small; 
        line-height: 4vh; 
        font-weight: bold; 
        font-size: .9em;
    }

    &.holiday::before
    {
        content '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #2B7BFC08;
        z-index: -1;
    }
`;

const Treballador = styled.div`
    position: relative;
    width: 16vw;
    height: 46px;
    padding-left: 2vw;

    font-size: 0.9em;
    font-weight: bold;
    color: #2b7bfc60;

    display: flex;
    align-items: center;
    gap: 12px;

    * {
        margin: 0;
        padding: 0;
    }
    div {
        width: 12px;
        height: 12px;
        background: #baefdf;
        border-radius: 50%;
    }
    img {
        height: 24px;
        width: 24px;
        border: 1px solid black;
        border-radius: 50%;
    }

    h3 {
        font-size: 1em;
        font-weight: bold;
        color: #2c2784;
    }
`;

const Event = styled.div`
    position: absolute;
    left: calc(${(props) => props.left} * 40px + 16vw + 10px);
    height: 38px;
    width: calc(${(props) => props.width} * 40px + 20px);
    color: white;
    border-radius: 30px;

    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize;

    &.vacances {
        background: #4adeb3;
    }
    &.abcencia {
        background: #ff4545;
    }
    &.festes {
        background: #4a9dde;
    }
    &.hide {
        display: none;
    }
`;
const DayEvent = styled.div`
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.default {
        background: #70707020;
    }
    &.default::before {
        content: '';
        position: absolute;
        width: 8px;
        height: 2px;
        background: #f2f2f2;
    }

    &.V {
        background: #baefdf;
    }
    &.V::before {
        content: 'V';
    }
    &.TT {
        background: #ffdbbc;
    }
    &.TT::before {
        content: 'TT';
    }
    &.TM {
        background: #fcf3df;
    }
    &.TM::before {
        content: 'TM';
    }
    &.TN {
        background: #adc4e8;
    }
    &.TN::before {
        content: 'TN';
    }

    &:not(.default)::before {
        position: absolute;
        color: #151515;
        font-size: 0.9em;
    }

    &.week {
        width: 86px;
        border-radius: 30px;

        &.V::before {
            content: 'Vacances';
        }
        &.TT::before {
            content: 'Torn tarda';
        }
        &.TM::before {
            content: 'Torn matí';
        }
        &.TN::before {
            content: 'Torn nit';
        }
    }
`;

export class Matrix extends React.Component {
    constructor() {
        super();
        this.state = {
            week: 0,
            selectedTreballadors: [],
        };
        this.handleWeekBackward = this.handleWeekBackward.bind(this);
        this.handleWeekForward = this.handleWeekForward.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(e, treballador) {
        const isChecked = e.target.checked;
        this.setState((prevState) => {
          if (isChecked) {
            return {
              selectedTreballadors: [...prevState.selectedTreballadors, treballador],
            };
          }
          const updatedTreballadors = prevState.selectedTreballadors.filter(
            (selectedTreballador) => selectedTreballador !== treballador
          );
          return {
            selectedTreballadors: updatedTreballadors,
          };
        }, () => {
          this.props.onSelectedTreballadorsChange(this.state.selectedTreballadors);
        });
      }
      
      
      
      

    handleWeekBackward() {
        this.setState((prevState) => {
            if (prevState.week > 0) {
                return { week: prevState.week - 1 };
            }
            return null;
        });
    }

    handleWeekForward() {
        this.setState((prevState) => {
            if (prevState.week < 4) {
                return { week: prevState.week + 1 };
            }
            return null;
        });
    }

    /* Displays envents on Matrix
     * @Param events Array<Object> (All worker's holidays and abcences)
     */
    showEvent(events) {
        return events.map((event) => (
            <Event
                width={event.fi - event.inici}
                left={event.inici - 1}
                key={event.name}
                className={event.name}
            >
                {event.name === 'abcencia' ? 'abcència' : event.name}
            </Event>
        ));
    }

    /* worker field in the table */
    TreballadorData(treballador) {
        return (
            <Treballador>
                <div></div>
                <input
          type="checkbox"
          onChange={(e) => this.handleCheckboxChange(e, treballador)}
        ></input>
                <img alt="a" src={treballador.img}></img>
                <h3>{treballador.name}</h3>
            </Treballador>
        );
    }

    /* Gets month data
     * @Param date:Date
     * @Return firstDay = Week day num.
     * @Return days = all month days
     */
    returnMonth(date) {
        const firstDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            1,
        ).getDay();
        const lastDay = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0,
        ).getDate();

        const days = Array.from(Array(lastDay).keys());
        return { firstDay, days };
    }

    /* Element <li>
     * Represents one row in the table
     */
    RowElements(type, events) {
        const DAYS = [
            'Dill.',
            'Dim.',
            'Dime.',
            'Dij.',
            'Div.',
            'Diss.',
            'Diu.',
        ];
        const date = this.returnMonth(this.props.date);
        const { firstDay, days } = date;

        return days.map((day) => (
            <Element
                key={day}
                className={
                    (firstDay - 1 + day) % DAYS.length >= 5
                        ? 'holiday'
                        : '' /* Checks if its weekend */
                }
            >
                {type === 'Date' /* check if its empty element */ ? (
                    <>
                        <p>
                            {
                                DAYS[
                                    (firstDay - 1 + day) % DAYS.length
                                ] /* returns week day name */
                            }
                        </p>
                        <h3>{day + 1}</h3>
                    </>
                ) : (
                    this.dayElement(
                        (firstDay - 1 + day) % DAYS.length,
                        events,
                        day + 1,
                    )
                )}
            </Element>
        ));
    }

    /* Element <li> 'week matrix'
     * Represents one row in the table
     */
    RowElementsWeek(type, events) {
        const DAYS = [
            'Dill.',
            'Dim.',
            'Dime.',
            'Dij.',
            'Div.',
            'Diss.',
            'Diu.',
        ];
        const weeks = [];

        const firstDayOfWeek = new Date(this.props.date);
        firstDayOfWeek.setDate(
            this.props.date.getDate() - this.props.date.getDay() + 1,
        );

        for (let i = 0; i < 7; i += 1) {
            const data = new Date(firstDayOfWeek);
            data.setDate(new Date(firstDayOfWeek).getDate() + i);
            weeks.push(data.getDate());
        }
        return weeks.map((day, index) => (
            <ElementWeek
                key={day}
                className={index % DAYS.length >= 5 ? 'holiday' : ''}
            >
                {type === 'Date' /* check if its empty element */ ? (
                    <>
                        <p>
                            {
                                DAYS[
                                    index % DAYS.length
                                ] /* returns week day name */
                            }
                        </p>
                        <h3>{day}</h3>
                    </>
                ) : (
                    this.dayElement(
                        index % DAYS.length,
                        events,
                        day + 1,
                        'week',
                    )
                )}
            </ElementWeek>
        ));
    }

    dayElement(weekDay, events, day, type) {
        let className = 'default';
        let trobat = false;
        let contador = 0;

        while (contador < events.length && !trobat) {
            if (parseInt(events[contador].dia, 10) === day) {
                className = events[contador].torn;
                trobat = true;
            }
            contador += 1;
        }

        return this.props.type === 'matrix-torns' &&
            weekDay !== 5 &&
            weekDay !== 6 ? (
            <DayEvent className={`${className} ${type}`} />
        ) : (
            ''
        );
    }

    render() {
        return (
            <>
                <MatrixBox
                    className={`matrix month ${
                        this.props.type === 'matrix-torns' ? 'hide' : ''
                    }`}
                >
                    <ul>
                        <MatrixRow>
                            {this.props.type === 'matrix-torns' ? (
                                <Treballador>Quadrant</Treballador>
                            ) : (
                                <Treballador>Treballadors</Treballador>
                            )}
                            {this.RowElements('Date')}
                        </MatrixRow>
                        {this.props.dades.map((treballador) => (
                            <MatrixRow key={treballador.name}>
                                {this.TreballadorData(
                                    treballador
                                )}
                                {this.RowElements('', treballador.events)}
                                {typeof treballador.events !== 'undefined' &&
                                treballador.events !== null
                                    ? this.showEvent(treballador.events)
                                    : ''}
                            </MatrixRow>
                        ))}
                    </ul>
                </MatrixBox>
                {this.props.type === 'matrix-torns' ? (
                    <MatrixBox className="matrix week">
                        <ul>
                            <MatrixRow>
                                <Treballador>Quadrant</Treballador>
                                {this.RowElementsWeek(
                                    'Date',
                                    this.state.week + 1,
                                )}
                            </MatrixRow>
                            {this.props.dades.map((treballador) => (
                                <MatrixRow key={treballador.name}>
                                    {this.TreballadorData(
                                        treballador.name,
                                        treballador.img,
                                    )}
                                    {this.RowElementsWeek(
                                        '',
                                        treballador.events,
                                    )}
                                    {typeof treballador.events !==
                                        'undefined' &&
                                    treballador.events !== null
                                        ? this.showEvent(treballador.events)
                                        : ''}
                                </MatrixRow>
                            ))}
                        </ul>
                    </MatrixBox>
                ) : (
                    ''
                )}
            </>
        );
    }
}
