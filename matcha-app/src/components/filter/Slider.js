import React, { Component } from 'react';
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

const Styles = styled.div`
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
      ${props => sliderThumbStyles(props)}
    }

    &::-moz-range-thumb {
      ${props => sliderThumbStyles(props)}
    }
  }
`;

export default class Slider extends React.Component {
    state = {
        value: 5
    }

    handleOnChange = (e) => {
        this.setState({value: e.target.value})
    }

    render() {
        return (
            <Styles>
                <div className="value center_b search-t">
                    <label>Tags Related: {this.state.value}
                    </label>
                </div>
                <input type="range" min={0} max={10} value={this.state.value} className="slider" onChange={this.handleOnChange} />
            </Styles>
        )
    }
}