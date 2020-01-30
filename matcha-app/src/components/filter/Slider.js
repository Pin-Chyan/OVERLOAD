import React from 'react';
import styled from 'styled-components';

const sliderThumbStyles = (props) => (`
  width: 15px;
  height: 15px;
  background: ${props.color};
  cursor: pointer;
  outline: 5px solid #333;
  opacity: 0.8;
  -webkit-transition: .2s;
  transition: opacity .2s;
`);

// const Styles = styled.div`
//   align-items: center;
//   color: #888;

//   .value {
//     flex: 1;
//     font-size: 1rem;
//   }

//   .slider {
//     flex: 6;
//     -webkit-appearance: none;
//     width: 100%;
//     height: 5px;
//     border-radius: 5px;
//     background: white;
//     outline: none;

//     &::-webkit-slider-thumb {
//       -webkit-appearance: none;
//       appearance: none;
//       ${props => sliderThumbStyles(props)}
//     }

//     &::-moz-range-thumb {
//       ${props => sliderThumbStyles(props)}
//     }
//   }
// `;

export default class Slider extends React.Component {

    constructor(props){
      super(props);
      this.state = {};
      this.Styles = styled.div`
        align-items: center;
        color: #888;

        .value {
          flex: 1;
          font-size: 1rem;
        }
      
        .slider {
          flex: 6;
          -webkit-appearance: none;
          width: 100%;
          height: 5px;
          border-radius: 5px;
          background: white;
          outline: none;
        
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            ${props => this.sliderThumbStyles(props)}
          }
        
          &::-moz-range-thumb {
            ${props => this.sliderThumbStyles(props)}
          }
        }
      `;
    }
    sliderThumbStyles = (props) => (`
      width: 15px;
      height: 15px;
      background: ${props.color};
      cursor: pointer;
      outline: 5px solid #333;
      opacity: 0.8;
      -webkit-transition: .2s;
      transition: opacity .2s;
    `);
    state = {
        value: 5
    }

    handleOnChange = (e) => {
      if (e.target.value > 79)
        localStorage.setItem('age_gap', 'max');
      else
        localStorage.setItem('age_gap', e.target.value);
      this.setState({"max_age":e.target.value})
    }
    handleOnChange2 = (e) => {
      if (e.target.value > 19999)
        localStorage.setItem('max_dst', 'anywhere');
      else
        localStorage.setItem('max_dst', e.target.value);
      this.setState({"max_dst":e.target.value2})
    }
    handleOnChange3 = (e) => {
      if (e.target.value > 999)
        localStorage.setItem('max_fam', 'anyone');
      else
        localStorage.setItem('max_fam', e.target.value);
      this.setState({"max_fam":e.target.value3})
    }
    handleOnChange4 = (e) => {
      if (e.target.value > 99)
        localStorage.setItem('max_tag', 'anyone');
      else
        localStorage.setItem('max_tag', e.target.value);
      this.setState({"max_fam":e.target.value4})
    }

    render() {
        return (
            <this.Styles>
                <div className="value center_b search-t">
                    <label>Age Gap: {localStorage.age_gap}
                    </label>
                </div>
                <input type="range" min={0} max={80} value={this.state.value} className="slider" onChange={this.handleOnChange} />
                <div className="value center_b search-t">
                    <label>Max Distance: {localStorage.max_dst}
                    </label>
                </div>
                <input type="range" min={0} max={20000} value={this.state.value2} className="slider" onChange={this.handleOnChange2} />
                <div className="value center_b search-t">
                    <label>Max Fame: {localStorage.max_fam}
                    </label>
                </div>
                <input type="range" min={0} max={1000} value={this.state.value3} className="slider" onChange={this.handleOnChange3} />
                <div className="value center_b search-t">
                    <label>Min tag: {localStorage.max_tag}
                    </label>
                </div>
                <input type="range" min={0} max={100} value={this.state.value4} className="slider" onChange={this.handleOnChange4} />
            </this.Styles>
        )
    }
}