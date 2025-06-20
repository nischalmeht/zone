// D3WaveChart.jsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const D3WaveChart = ({ salesData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!salesData || salesData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 478;
    const height = 150;
    const margin = { top: 10, bottom: 20, left: 10, right: 10 };

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "none");
    const data = salesData
      .map(d => ({
        date: new Date(d.year, d.month - 1),
        sales: d.sales
      }))
      .sort((a, b) => a.date - b.date);

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.sales)]).nice()
      .range([height - margin.bottom, margin.top]);

    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "0%").attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#f0f3f4");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#f0f3f4").attr("stop-opacity", 0);

    const area = d3.area()
      .x(d => xScale(d.date))
      .y0(height - margin.bottom)
      .y1(d => yScale(d.sales))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(data)
      .attr("fill", "url(#gradient)")
      .attr("d", area);

    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.sales))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#637988")
      .attr("stroke-width", 3)
      .attr("stroke-linecap", "round")
      .attr("d", line);

    // Tooltip group inside SVG
    const tooltipGroup = svg.append("g")
      .style("display", "none");

    tooltipGroup.append("circle")
      .attr("r", 5)
      .attr("fill", "#637988");

    const tooltipBg = tooltipGroup.append("rect")
      .attr("fill", "white")
      .attr("stroke", "#ccc")
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("opacity", 0.9);

    const tooltipText = tooltipGroup.append("text")
      .attr("font-size", "12px")
      .attr("fill", "#333");

    // Bind tooltip
    svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.date))
      .attr("cy", d => yScale(d.sales))
      .attr("r", 5)
      .attr("fill", "#637988")
      .style("cursor", "pointer")
      .on("mouseover", (event, d) => {
        const x = xScale(d.date);
        const y = yScale(d.sales);
        const month = d.date.toLocaleString("default", { month: "short" });
        const text = `${month} ${d.date.getFullYear()} ₹${d.sales}`;

        tooltipText.text(text);
        const textBBox = tooltipText.node().getBBox();

        tooltipBg
          .attr("width", textBBox.width + 10)
          .attr("height", textBBox.height + 6)
          .attr("x", -textBBox.width / 2 - 5)
          .attr("y", -textBBox.height - 10);

        tooltipText
          .attr("x", -textBBox.width / 2)
          .attr("y", -15);

        tooltipGroup
          .attr("transform", `translate(${x}, ${y})`)
          .style("display", "block");
      })
      .on("mouseout", () => {
        tooltipGroup.style("display", "none");
      });

  }, []);

  return <svg ref={svgRef} width="100%" height="150" />;
};

export default D3WaveChart;
