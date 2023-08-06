import React, { useEffect, useRef } from 'react';
function Graph({ a, b, c, result, vertex }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear the canvas
    context.clearRect(0, 0, width, height);

    // Draw the x and y axes
    context.beginPath();
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2, height);
    context.strokeStyle = '#000';
    context.stroke();

    // Calculate the x and y values for each pixel on the graph
    const xValues = [];
    const yValues = [];
    for (let pixelX = 0; pixelX < width; pixelX++) {
      const x = (pixelX - width / 2) / 25; // Scale the x value
      const y = a * x ** 2 + b * x + c;
      xValues.push(x);
      yValues.push(y);
    }

    // Find the minimum and maximum y values
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    // Plot the graph
    context.beginPath();
    context.moveTo((xValues[0] * 25) + width / 2, height / 2 - (yValues[0] - minY) * (height / (maxY - minY)));
    for (let i = 1; i < xValues.length; i++) {
      const pixelX = (xValues[i] * 25) + width / 2;
      const pixelY = height / 2 - (yValues[i] - minY) * (height / (maxY - minY));
      context.lineTo(pixelX, pixelY);
    }
    context.strokeStyle = '#f00'; // Red color
    context.lineWidth = 2;
    context.stroke();

    // Plot the roots
    if (result && result.length > 0) {
      context.fillStyle = '#00f'; // Blue color
      for (let i = 0; i < result.length; i++) {
        const rootX = result[i] * 25 + width / 2;
        const rootY = height / 2;
        context.beginPath();
        context.arc(rootX, rootY, 5, 0, 2 * Math.PI);
        context.fill();
      }
    }

    // Plot the vertex
    if (vertex) {
      const vertexX = vertex.x * 25 + width / 2;
      const vertexY = height / 2 - (vertex.y - minY) * (height / (maxY - minY));
      context.fillStyle = '#0f0'; // Green color
      context.beginPath();
      context.arc(vertexX, vertexY, 5, 0, 2 * Math.PI);
      context.fill();
    }
  }, [a, b, c, result, vertex]);

  return <canvas ref={canvasRef} width={300} height={500} />;
}

export default Graph;