import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GiReturnArrow } from 'react-icons/gi';
import { MdSpeed } from 'react-icons/md';
import { VscDebugBreakpointUnsupported } from 'react-icons/vsc';
import { FaStackOverflow } from 'react-icons/fa';
import { SiTampermonkey } from 'react-icons/si';
import { BiSolidBatteryLow } from 'react-icons/bi';

const tiles = [
  {
    count: '37395',
    description: 'Activated VLTD',
    icon: <GiReturnArrow size={50} fill="#424242" />,
  },
  {
    count: '37026',
    description: 'VLTD in Registered Vehicles',
    icon: <MdSpeed size={50} fill="red" />,
  },
  {
    count: '9096',
    description: 'VLTD Sending data',
    icon: <VscDebugBreakpointUnsupported size={63} fill="green" />,
  },
  {
    count: '23662',
    description: 'VLTD not sending data',
    icon: <FaStackOverflow size={50} fill="#ab9505" />,
  },
  {
    count: '4268',
    description: 'VLTD never send Data',
    icon: <SiTampermonkey size={50} fill="#07827a" />,
  },
  {
    count: '6127',
    description: 'E-sim Validity Exhausted',
    icon: <BiSolidBatteryLow size={50} fill="red" />,
  },
];

const MiniDashboard = () => {
  const chartRef = useRef(null);
  const barRef = useRef(null);
  const data = [40, 5, 35, 10, 10, 25]; // Make sure data and colors arrays have the same length
  const colors = [
    '#EB984E',
    '#5D6D7E',
    '#2471A3',
    '#F5B041',
    '#85929E',
    '#3498DB', // Add more colors as needed
  ];

  useEffect(() => {


    const width = 200;
    const height = 250;
    const radius = Math.min(width, height) / 2;


    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);


    const pie = d3.pie().value((d) => d);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);


    const arcs = svg.selectAll('arc').data(pie(data)).enter().append('g');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors[i]);


    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text((d) => d.value);
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, []);


  useEffect(() => {
    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 550 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Create an array of colors for the bars
    const colors = ['red', 'green']; // Add more colors if needed

    // Append the SVG object to the component's div
    const svg = d3
      .select(barRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Sample data for the two bar series
    const data = [
      [
        { Devices: '777', Value: 500 },
        { Devices: 'ACTI', Value: 1200 },
        { Devices: 'AEPL', Value: 800 },
        { Devices: 'AMAZ14A', Value: 900 },
        { Devices: 'ASPL', Value: 1000 },
        { Devices: 'BBOXX4', Value: 4000 },
        { Devices: 'BND', Value: 4500 },
        { Devices: 'MARK', Value: 3000 },
        { Devices: 'MIC', Value: 2000 },
        { Devices: 'NICK', Value: 1000 },
        { Devices: 'NIPPON', Value: 600 },
        { Devices: 'RPL', Value: 1200 },
        { Devices: 'RSPL', Value: 700 },
        { Devices: 'RA10', Value: 500 },
        { Devices: 'SANSUI', Value: 2500 },
        { Devices: 'ROADRPA', Value: 400 },
        { Devices: 'EAGS', Value: 1000 },
        { Devices: 'PNVE', Value: 1200 },
        { Devices: 'DM001', Value: 500 },
        { Devices: 'TRIMBLE', Value: 800 },
        { Devices: 'WTEX', Value: 3000 },
        // Add more data points as needed
      ],
      [
        { Devices: '777', Value: 500 },
        { Devices: 'ACTI', Value: 1200 },
        { Devices: 'AEPL', Value: 800 },
        { Devices: 'AMAZ14A', Value: 900 },
        { Devices: 'ASPL', Value: 1000 },
        { Devices: 'BBOXX4', Value: 4000 },
        { Devices: 'BND', Value: 4500 },
        { Devices: 'MARK', Value: 3000 },
        { Devices: 'MIC', Value: 2000 },
        { Devices: 'NICK', Value: 1000 },
        { Devices: 'NIPPON', Value: 600 },
        { Devices: 'RPL', Value: 1200 },
        { Devices: 'RSPL', Value: 700 },
        { Devices: 'RA10', Value: 500 },
        { Devices: 'SANSUI', Value: 2500 },
        { Devices: 'ROADRPA', Value: 400 },
        { Devices: 'EAGS', Value: 1000 },
        { Devices: 'PNVE', Value: 1200 },
        { Devices: 'DM001', Value: 500 },
        { Devices: 'TRIMBLE', Value: 800 },
        { Devices: 'WTEX', Value: 3000 },
        // Add more data points as needed
      ],
    ];

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data[0].map((d) => d.Devices))
      .padding(0.2);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 10000]).range([height, 0]);


    // Create Y axis gridlines
    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y).ticks(3).tickSize(-width).tickFormat(''));

    // Create X axis gridlines
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSize(-height).tickFormat(''));


    // Modify the Y axis
    const yAxis = svg.append('g').call(d3.axisLeft(y).tickValues([0, 10000]).tickFormat(d3.format('.0s')));

    // Remove the middle tick line
    yAxis.selectAll('.tick line').filter(d => d === 5000).remove();
    svg.selectAll('.tick line').style('stroke', 'Lightgrey');

    // Bars for Series 1 (using colors[0])
    svg
      .selectAll('.mybar-series-1')
      .data(data[0])
      .enter()
      .append('rect')
      .attr('class', 'mybar-series-1')
      .attr('x', (d) => x(d.Devices))
      .attr('y', (d) => y(d.Value))
      .attr('width', x.bandwidth() / 2)
      .attr('height', (d) => height - y(d.Value))
      .attr('fill', colors[0]);

    // Bars for Series 2 (using colors[1])
    svg
      .selectAll('.mybar-series-2')
      .data(data[1])
      .enter()
      .append('rect')
      .attr('class', 'mybar-series-2')
      .attr('x', (d) => x(d.Devices) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.Value))
      .attr('width', x.bandwidth() / 2)
      .attr('height', (d) => height - y(d.Value))
      .attr('fill', colors[1]);
    // Add legend
    const legend = svg.append('g').attr('transform', `translate(0,${height + 40})`);


    legend
      .append('circle')
      .attr('cx', 5)
      .attr('cy', 15)
      .attr('r', 5)
      .attr('fill', colors[0]);

    legend
      .append('text')
      .attr('x', 20)
      .attr('y', 20)
      .text('Whitelist device');

    legend
      .append('circle')
      .attr('cx', 145)
      .attr('cy', 15)
      .attr('r', 5)
      .attr('fill', colors[1]);

    legend
      .append('text')
      .attr('x', 170)
      .attr('y', 20)
      .text('Activated device');

    return () => {
      d3.select(barRef.current).selectAll('*').remove();
    };
  }, []);

  return (
    <>
      <div className="mini-dashboard">
        {tiles.map((tile, index) => (
          <div className="box" key={index}>
            <div className="box-icon">{tile.icon}</div>
            <div className="box-count">{tile.count}</div>
            <div className="box-description">{tile.description}</div>
            <div className="card-item-count">
              <hr style={{ height: '2px', backgroundColor: 'grey' }}></hr>
            </div>
            <div className="widget-card-btn-ctn">
              <p className="">More Info</p>
              <p className="widgrt-card-click">Click</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mini-container">
        <div className="bar-chart">
          <div className="nodevicesparagraph">
            <center>Number of Devices</center>
          </div>
          <div ref={barRef}></div>
        </div>
       
          <div className="pie-charts">
            <h3>All</h3>
            <hr className="horizontal-line" />
            <center>Devices (Not Sending Data)</center>
            <div ref={chartRef}></div>
            <div className="paragraph-container blue-background-paragraph">
              Devices whose validity should be increased
            </div>
            <div className="data-row">
              <div className="data-item">
                <center className="data-summary">564</center>
                <span>1 month Remaining</span>
                
              </div>
              <div className="data-item">
                <center className="data-summary">0</center>
                <span>15 days Remaining</span>
                
              </div>
              <div className="data-item">
                <center className="data-summary">128</center>
                <span>7 days Remaining</span>
               
              </div>
            </div>
          </div>
        
      </div>
    </>
  );
};

export default MiniDashboard;