import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const RegionSalesBarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // clear previous chart

    const width = 300;
    const height = 200;
    const margin = { top: 10, right: 10, bottom: 40, left: 10 };

    svg
      .attr("width", width)
      .attr("height", height);

    const max = d3.max(data, d => d.totalOrderValue);

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.region))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const y = d3
      .scaleLinear()
      .domain([0, max])
      .range([height - margin.bottom, margin.top]);

    // Bars
    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.region))
      .attr("y", d => y(d.totalOrderValue))
      .attr("width", x.bandwidth())
      .attr("height", d => height - margin.bottom)
      .attr("fill", "#f0f3f4")
      .attr("stroke", "#637988")
      .attr("stroke-width", 2);

    // Region labels
    svg
      .selectAll("text.region")
      .data(data)
      .join("text")
      .attr("class", "region")
      .attr("x", d => x(d.region) + x.bandwidth() / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "#637988")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text(d => d.region);

  }, [data]);

  return <svg ref={svgRef} />;
};

export default RegionSalesBarChart;
