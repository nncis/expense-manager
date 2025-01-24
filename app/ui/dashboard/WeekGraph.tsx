"use client"

import * as d3 from "d3";
import React, { useEffect, useRef, useState } from 'react';
import { WeekExpense, WeekExpenseAmount } from '@/lib/definitions';

interface GraphProp {
  weekExpenses: WeekExpense[];
}

export default function WeekGraph({ weekExpenses }: GraphProp) {

  const chartRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = chartRef.current?.parentElement?.clientWidth || 600;
      setDimensions({ width: containerWidth, height: containerWidth * 0.75 }); // Relación de aspecto 4:3
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Llama al handler al montar el componente

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {

    const { width, height } = dimensions;
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const radius = Math.min(innerWidth, innerHeight) / 2;

    const color = d3.scaleOrdinal(d3.schemePastel1);
    
    const arc = d3.arc<d3.PieArcDatum<WeekExpenseAmount>>()
      .innerRadius(0)
      .outerRadius(radius);

    const pie = d3.pie<WeekExpenseAmount>()
      .value(d => d.amount);

    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); //
    

    //sum the total amount for the same category, 
    //ex: category: {Category: "Greengrocery", amount: 3000}, {Category: "Greengrocery", amount: 5000}
    //result = {Category: "Greengrocery", amount: 8000};

    const data: WeekExpenseAmount[] = Object.values(
      weekExpenses.reduce<Record<string, WeekExpenseAmount>>((acc, item) => {
        if (acc[item.category]) {
          acc[item.category].amount += item.amount;
        } else {
          acc[item.category] = { category: item.category, amount: item.amount };
        }
        return acc;
      }, {})
    )

    const tooltip = d3.select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.7)')
      .style('color', '#fff')
      .style('padding', '5px 10px')
      .style('border-radius', '5px')
      .style('pointer-events', 'none')
      .style('opacity', 0);


    //SVG
    const g = svg
      .append('g')
      .attr('transform', `translate(${(width / 2)} , ${(height / 2)})`)
      .attr('viewBox', `0 0 ${width} ${height}`) // Relativo a un sistema de coordenadas base
      .attr('preserveAspectRatio', 'xMidYMid meet') // Mantiene la relación de aspecto
      .classed('responsive', true);
      ;


    //Graphing the pie
    g.selectAll('path')
      .data(pie(data))
      .join('path')
      .attr('d', arc as any)
      .attr('fill', d => color(d.data.amount.toString()))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .on('mouseover', function (event, d) {
        tooltip
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 20}px`)
          .style('opacity', 1)
          .html(`
          <strong>${d.data.category}</strong><br />
          Valor: $${d.data.amount}
        `);
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });
    ;
    
    //Text

    // svg.selectAll("text")
    //   .data(pie(data))
    //   .enter()
    //   .append("text")
    //   .attr("transform", d => `translate(${arc.centroid(d)})`)
    //   .attr("text-anchor", "middle")
    //   .text(d => d.data.amount);

    //Legend

    const legend = svg
      .append('g')
      .attr('transform', `translate(${(width / 3)}, ${(height / 1)})`);

    const legendItems = legend
      .selectAll('.legend-item')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (_, i) => `translate(0, ${i * 25})`);
    
    legendItems
      .append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', d => color(d.amount.toString()));

    legendItems
      .append('text')
      .attr('x', 25)
      .attr('y', 12)
      .text(d => d.category)
      .style('font-size', '1.2rem')
      .style('alignment-baseline', 'middle');

      return () => {
        tooltip.remove();
      };

  }, [dimensions, weekExpenses])

  return (
      <svg ref={chartRef}></svg>
  )

};