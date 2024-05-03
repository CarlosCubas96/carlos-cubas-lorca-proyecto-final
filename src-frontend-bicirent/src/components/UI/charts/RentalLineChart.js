import React from 'react';
import { Line } from 'react-chartjs-2';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import 'chart.js/auto';

const RentalLineChart = ({ rentalData }) => {
    // Extraer y preparar datos para el gráfico
    const entries = Object.entries(rentalData).sort((a, b) => a[0].localeCompare(b[0]));
    const labels = entries.map(([date], index) =>
        index % 5 === 0 ? format(parseISO(date), 'dd MMM', { locale: es }) : ''
    );
    const dataPoints = entries.map(([, count]) => count);

    // Configuración del gráfico
    const data = {
        labels,
        datasets: [
            {
                label: 'Alquileres por Día',
                data: dataPoints,
                fill: false,
                borderColor: '#737373',
                borderWidth: 2,
                pointRadius: 3,
                tension: 0.5 

            }
        ]
    };

    // Opciones del gráfico
    const options = {
        scales: {
            y: {
                display: false,  // Oculta el eje Y completamente
                beginAtZero: true,
            },
            x: {
                ticks: {
                    maxRotation: 0,  // Mantiene las etiquetas del eje X rectas
                    autoSkip: true, // Habilita el salto automático para evitar solapamientos
                    maxTicksLimit: 6  // Limita el número máximo de etiquetas en el eje X
                },
                grid: {
                    display: false  // Oculta las líneas de cuadrícula en el eje X
                }
            }
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false  // Oculta la leyenda del gráfico
            },
            tooltip: {
                enabled: true  // Deshabilita los tooltips
            }
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0  // Oculta los puntos del gráfico
            }
        }
    };

    return (
        <div style={{ width: '100%', height: "300px" }} >
            <Line data={data} options={options} />
        </div>
    );
};

export default RentalLineChart;
