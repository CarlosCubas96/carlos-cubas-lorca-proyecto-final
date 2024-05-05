import React from 'react';
import { Line } from 'react-chartjs-2';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import 'chart.js/auto';

const RentalLineChart = ({ rentalData }) => {
    // Extraer y preparar datos para el gráfico
    const entries = Object.entries(rentalData).sort((a, b) => a[0].localeCompare(b[0]));

    // Configuración del gráfico
    const data = {
        labels: entries.map(([date]) => format(parseISO(date), 'dd MMM', { locale: es })),
        datasets: [
            {
                label: 'Alquileres por Día',
                data: entries.map(([date, count]) => count),
                fill: false,
                borderColor: '#737373',
                borderWidth: 4,
                pointRadius: 2,  
                tension: 0.4  
            }
        ]
    };

    // Opciones del gráfico
    const options = {
        scales: {
            y: {
                display: false,
                beginAtZero: true,
                grid: {
                    display: false  // Oculta las líneas de cuadrícula en el eje Y
                }
            },
            x: {
                grid: {
                    display: false  // Oculta las líneas de cuadrícula en el eje X
                },
                ticks: {
                    maxRotation: 0,  // Mantiene las etiquetas del eje X rectas
                    autoSkip: true,  // Habilita el salto automático para evitar solapamientos
                    maxTicksLimit: 6  // Limita el número máximo de etiquetas en el eje X
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
                enabled: true,
                callbacks: {
                    label: function (context) {
                        return `${context.parsed.y} alquileres el ${context.label}`;
                    }
                }
            }
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 4 // Si no deseas mostrar puntos, establecer a 0
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
