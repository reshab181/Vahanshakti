import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DonutChart = () => {
  const chartRef = useRef(null);
  const data = [30, 40, 50,100,400,2000];
  const colors = ['#E6B0AA', '#AF7AC5', '#7FB3D5','#5DADE2','#48C9B0','#EDBB99'];

  useEffect(() => {
    // Chart dimensions
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Create the SVG element
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Create the pie layout
    const pie = d3.pie().value((d) => d);

    // Create the arc generator
    const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius);

    // Draw the donut chart
    const arcs = svg.selectAll('arc').data(pie(data)).enter().append('g');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors[i]);

    // Optionally, you can add labels to the chart
    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text((d) => d.data);

    return () => {
      // Cleanup on unmount
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, []);

  return <div ref={chartRef}></div>;
};

export default DonutChart;
