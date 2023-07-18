import React from 'react';
import { Matrix } from 'components/Matrix/Matrix';
import { Month } from './Month';
import { Day } from './Day';

export class Calendar extends React.Component {
    type = '';

    constructor(props) {
      super(props);
      this.type = this.props.type;
      this.state = { date: new Date() ,
        selectedTreballadors: [],
    };
    }

    handleSelectedTreballadorsChange = (selectedTreballadors) => {
        this.setState({ selectedTreballadors }, () => {
          this.props.onSelectedTreballadorsChange(this.state.selectedTreballadors);
        });
      };
      
    /* sum 'num' months
     * @Param num number
     */
    changeMonth = (num) => {
        this.setState((prevState) => ({
            date: new Date(
                prevState.date.setMonth(prevState.date.getMonth() + num),
            ),
        }));
    };

    /* sum 'num' weeks
     * @Param num number
     */
    changeWeek = (num) => {
        this.setState((prevState) => ({
            date: new Date(
                prevState.date.setDate(prevState.date.getDate() + 7 * num),
            ),
        }));
    };

    /* sum 'num' days
     * @Param num number
     */
    changeDay = (num) => {
        this.setState((prevState) => ({
            date: new Date(
                prevState.date.setDate(prevState.date.getDate() + num),
            ),
        }));
    };

    otherViews() {
        let component;
        switch (this.type) {
            case 'matrix':
                component = this.matrixRender();
                break;
            case 'matrix-torns':
                component = this.matrixTornsRender();
                break;
            default:
                component = (
                    <Month
                        date={this.state.date}
                        changeMonth={this.changeMonth}
                    />
                );
                break;
        }
        return component;
    }



    
    matrixRender() {
        return (
          <>
            <Month
              date={this.state.date}
              changeMonth={this.changeMonth}
              type="matrix"
            />
<Matrix
  date={this.state.date}
  dades={this.props.dades}
  selectedTreballadors={this.state.selectedTreballadors}
  onSelectedTreballadorsChange={this.handleSelectedTreballadorsChange}
/>
          </>
        );
      }
      
      
      
      

    matrixTornsRender() {
        return (
            <>
                <Month
                    date={this.state.date}
                    changeMonth={this.changeMonth}
                    changeWeek={this.changeWeek}
                    type="matrix-torns"
                />
                <Matrix
                    date={this.state.date}
                    dades={this.props.dades}
                    type={this.props.type}
                />
            </>
        );
    }

    render() {
        return this.type !== undefined ? (
          this.otherViews()
        ) : (
          <>
            <Month date={this.state.date} changeMonth={this.changeMonth} />
            <Day date={this.state.date} changeDay={this.changeDay} />
          </>
        );
      }
}
