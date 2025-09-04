import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const CacheVisualization = ({
  caches,
  currentStep,
  simulationResults,
  memoryTrace,
}) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    const handleResize = () => {
      const container = svgRef.current?.parentElement;
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: Math.max(500, Math.min(800, container.clientHeight)),
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current || Object.keys(caches).length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;
    const margin = { top: 20, right: 20, bottom: 60, left: 20 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Create main group
    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Calculate layout
    const algorithms = Object.keys(caches);
    const algorithmWidth = chartWidth / algorithms.length;
    const cacheSlotHeight = 40;
    const cacheSlotSpacing = 10;

    // Draw each algorithm's cache
    algorithms.forEach((algorithm, algIndex) => {
      const algorithmGroup = g
        .append("g")
        .attr("transform", `translate(${algIndex * algorithmWidth}, 0)`);

      // Algorithm title
      algorithmGroup
        .append("text")
        .attr("x", algorithmWidth / 2)
        .attr("y", -5)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .attr("fill", "#374151")
        .text(algorithm);

      // Cache slots
      const cacheState = caches[algorithm].getState();
      const maxCapacity = caches[algorithm].capacity;

      for (let i = 0; i < maxCapacity; i++) {
        const slotGroup = algorithmGroup
          .append("g")
          .attr(
            "transform",
            `translate(0, ${i * (cacheSlotHeight + cacheSlotSpacing)})`
          );

        // Slot background
        const slotRect = slotGroup
          .append("rect")
          .attr("width", algorithmWidth - 20)
          .attr("height", cacheSlotHeight)
          .attr("rx", 4)
          .attr("fill", "#f3f4f6")
          .attr("stroke", "#d1d5db")
          .attr("stroke-width", 2);

        // Slot content
        const slotContent = slotGroup
          .append("text")
          .attr("x", (algorithmWidth - 20) / 2)
          .attr("y", cacheSlotHeight / 2)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .attr("font-size", "12px")
          .attr("font-weight", "500")
          .attr("fill", "#6b7280");

        if (i < cacheState.cache.length) {
          const value = cacheState.cache[i];
          slotContent.text(value);
          slotRect
            .attr("fill", "#dbeafe")
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 2);
        } else {
          slotContent.text("Empty");
        }
      }

      // Current reference indicator
      if (currentStep > 0 && currentStep <= memoryTrace.length) {
        const currentRef = memoryTrace[currentStep - 1];
        const result = simulationResults[currentStep - 1]?.results[algorithm];

        if (result) {
          const indicatorGroup = algorithmGroup
            .append("g")
            .attr(
              "transform",
              `translate(0, ${
                maxCapacity * (cacheSlotHeight + cacheSlotSpacing) + 20
              })`
            );

          // Reference arrow
          indicatorGroup
            .append("text")
            .attr("x", algorithmWidth / 2)
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", result.type === "hit" ? "#10b981" : "#ef4444")
            .text(`→ ${currentRef}`);

          // Result indicator
          indicatorGroup
            .append("text")
            .attr("x", algorithmWidth / 2)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .attr("font-size", "10px")
            .attr("font-weight", "500")
            .attr("fill", result.type === "hit" ? "#10b981" : "#ef4444")
            .text(result.type.toUpperCase());

          if (result.evicted) {
            indicatorGroup
              .append("text")
              .attr("x", algorithmWidth / 2)
              .attr("y", 30)
              .attr("text-anchor", "middle")
              .attr("font-size", "9px")
              .attr("fill", "#f59e0b")
              .text(`Evicted: ${result.evicted}`);
          }
        }
      }

      // Statistics
      const statsGroup = algorithmGroup
        .append("g")
        .attr(
          "transform",
          `translate(0, ${
            maxCapacity * (cacheSlotHeight + cacheSlotSpacing) + 60
          })`
        );

      const stats = [
        { label: "Hits", value: cacheState.hits, color: "#10b981" },
        { label: "Misses", value: cacheState.misses, color: "#ef4444" },
        {
          label: "Hit Rate",
          value: `${cacheState.hitRate.toFixed(1)}%`,
          color: "#3b82f6",
        },
      ];

      stats.forEach((stat, index) => {
        const statGroup = statsGroup
          .append("g")
          .attr("transform", `translate(0, ${index * 15})`);

        statGroup
          .append("text")
          .attr("x", 0)
          .attr("y", 0)
          .attr("font-size", "10px")
          .attr("font-weight", "500")
          .attr("fill", stat.color)
          .text(`${stat.label}: ${stat.value}`);
      });
    });

    // Memory trace visualization
    if (memoryTrace.length > 0) {
      const traceGroup = g
        .append("g")
        .attr("transform", `translate(0, ${chartHeight - 100})`);

      traceGroup
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .attr("fill", "#374151")
        .text("Memory Trace:");

      // Create a clip path for scrolling
      const clipPath = svg
        .append("defs")
        .append("clipPath")
        .attr("id", "trace-clip");

      clipPath
        .append("rect")
        .attr("x", 0)
        .attr("y", 20)
        .attr("width", chartWidth)
        .attr("height", 40);

      const traceText = memoryTrace
        .map((ref, index) => {
          const isCurrent = index === currentStep - 1;
          const isPast = index < currentStep - 1;
          return `<tspan fill="${
            isCurrent ? "#3b82f6" : isPast ? "#6b7280" : "#d1d5db"
          }" 
                          font-weight="${
                            isCurrent ? "bold" : "normal"
                          }">${ref}</tspan>`;
        })
        .join(" ");

      const traceTextElement = traceGroup
        .append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("font-size", "16px")
        .attr("clip-path", "url(#trace-clip)")
        .html(traceText);

      // Create scrollbar
      const scrollbarGroup = g
        .append("g")
        .attr("transform", `translate(0, ${chartHeight - 20})`);

      const scrollbarWidth = chartWidth;
      const scrollbarHeight = 8;
      const thumbWidth = Math.max(
        20,
        (chartWidth / memoryTrace.length) * chartWidth
      );

      // Scrollbar track
      scrollbarGroup
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", scrollbarWidth)
        .attr("height", scrollbarHeight)
        .attr("fill", "#e5e7eb")
        .attr("rx", 4);

      // Scrollbar thumb
      const thumb = scrollbarGroup
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", thumbWidth)
        .attr("height", scrollbarHeight)
        .attr("fill", "#6b7280")
        .attr("rx", 4)
        .style("cursor", "pointer");

      // Make scrollbar draggable
      const drag = d3.drag().on("drag", function (event) {
        const newX = Math.max(
          0,
          Math.min(scrollbarWidth - thumbWidth, event.x)
        );
        const scrollRatio = newX / (scrollbarWidth - thumbWidth);
        const maxScroll = Math.max(0, memoryTrace.length * 20 - chartWidth);
        const scrollPosition = scrollRatio * maxScroll;

        thumb.attr("x", newX);
        traceTextElement.attr("x", -scrollPosition);
      });

      thumb.call(drag);

      // Note: Auto-scroll removed - user must manually scroll to see current position
    }
  }, [caches, currentStep, simulationResults, memoryTrace, dimensions]);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Cache Visualization</h3>
      <div className="w-full overflow-hidden">
        <svg
          ref={svgRef}
          className="w-full"
          style={{ height: `${dimensions.height}px` }}
        />
      </div>
    </div>
  );
};

export default CacheVisualization;
