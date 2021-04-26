import React, { Component } from 'react';

export default class ProportionBarSalary extends Component {
  render() {
    const {
      inss,
      irpf,
      netSalary,
      colorINSS = 'orange',
      colorIRPF = 'red',
      colorNetSalary = 'green',
    } = this.props;

    console.log(this.props);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <div
          title={`${inss}%`}
          style={{
            backgroundColor: colorINSS,
            width: inss + '%',
            height: '20px',
          }}
        ></div>
        <div
          title={`${irpf}%`}
          style={{
            backgroundColor: colorIRPF,
            width: irpf + '%',
            height: '20px',
          }}
        ></div>
        <div
          title={`${netSalary}%`}
          style={{
            backgroundColor: colorNetSalary,
            width: netSalary + '%',
            height: '20px',
          }}
        ></div>
      </div>
    );
  }
}
