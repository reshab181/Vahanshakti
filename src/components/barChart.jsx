import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = () => {
  const chartRef = useRef(null);
  const data = [10, 25, 15, 30, 20];
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#C0C0C0', '#90EE90'];

  useEffect(() => {
    // Chart dimensions
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create the SVG element
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create the scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d, i) => i))
      .range([margin.left, innerWidth + margin.left])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([innerHeight + margin.top, margin.top]);

    // Draw the bars
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', (d) => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight + margin.top - yScale(d))
      .attr('fill', (d, i) => colors[i]);

    // Draw the axes
    const xAxis = d3.axisBottom(xScale).tickFormat((d, i) => `Bar ${i + 1}`);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${innerHeight + margin.top})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    return () => {
      // Cleanup on unmount
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, []);

  return <div className='bar-chart' ref={chartRef}></div>;
};

export default BarChart;
