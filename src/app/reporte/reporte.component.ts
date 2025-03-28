import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ReporteService } from '../services/reporte.service';
import { ColaboradorSolicitudes, ConsultaReporte } from '../models/reporte.model';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

@Component({
  selector: 'app-reporte',
  imports: [FormsModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css',
  standalone: true,
})
export class ReporteComponent implements OnInit, AfterViewInit {

  consulta: ConsultaReporte;
  respuestaConsulta: ColaboradorSolicitudes[] = [];

  @ViewChild('chartEstados', { static: false }) chartEstados?: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartColaboradores', { static: false }) chartColaboradores?: ElementRef<HTMLCanvasElement>;

  chart1?: Chart;
  chart2?: Chart;


  cantidadTotalEstados: number = 0;
  cantidadColaboradores: number = 0;
  colaboradorMasCasos
   colaboradorMenosCasos
  colaboradorMasPorResolver


  
  constructor(private service: ReporteService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.consulta = new ConsultaReporte();
  }

  ngAfterViewInit(): void {
    this.buscarReporte();
  }

  buscarReporte() {
    this.service.getConsultaReporte(this.consulta).subscribe((data) => {
      this.respuestaConsulta = data;
      console.log(this.respuestaConsulta);

      setTimeout(() => {
        if (this.chartEstados && this.chartColaboradores) {
          this.generarGraficaEstados();
          this.generarGraficaColaboradores();
          this.calcularDatos();
        } else {
          console.error("Los elementos canvas aún no están disponibles. Se reintentará.");
          setTimeout(() => {
            this.generarGraficaEstados();
            this.generarGraficaColaboradores();
            this.calcularDatos();
          }, 500);
        }
      }, 0);
    });
  }

  generarGraficaEstados() {
    if (!this.chartEstados?.nativeElement) {
      console.error("Elemento chartEstados no disponible aún");
      return;
    }
    
    if (this.chart1) this.chart1.destroy(); 

    const estadoCounts: { [key: string]: number } = {};
    this.respuestaConsulta.forEach(colaborador => {
      colaborador.estadosSolicitudes.forEach(estado => {
        estadoCounts[estado.estado] = (estadoCounts[estado.estado] || 0) + estado.cantidad;
      });
    });

    const estados = Object.keys(estadoCounts);
    const cantidades = Object.values(estadoCounts);

    const config: ChartConfiguration = {
      type: 'doughnut' as ChartType,
      data: {
        labels: estados,
        datasets: [{
          label: 'Cantidad de Solicitudes',
          data: cantidades,
          backgroundColor: estados.map(e => this.getColor(e))
        }]
      }
    };

    const ctx = this.chartEstados.nativeElement.getContext('2d');
    if (ctx) {
      this.chart1 = new Chart(ctx, config);
    }
  }

  generarGraficaColaboradores() {
    if (!this.chartColaboradores?.nativeElement) {
      console.error("Elemento chartColaboradores no disponible aún");
      return;
    }
  
    if (this.chart2) this.chart2.destroy(); 
  
    const colaboradoresUnicos = new Map<number | null, string>(); // Mapea ID -> Nombre
    const estadosUnicos = new Set<string>();
  
    this.respuestaConsulta.forEach((colaborador) => {
      colaboradoresUnicos.set(colaborador.colaboradorId, colaborador.colaboradorNombre || "Sin asignar");
      colaborador.estadosSolicitudes.forEach((estado) => {
        estadosUnicos.add(estado.estado);
      });
    });
  
    const colaboradoresArray = Array.from(colaboradoresUnicos.entries())
      .sort((a, b) => (a[0] || 0) - (b[0] || 0)); // Ordenar por ID (los null quedan al final)
  
    const estadosArray = Array.from(estadosUnicos);
  
    const datasets = estadosArray.map((estado) => {
      return {
        label: estado,
        data: colaboradoresArray.map(([colaboradorId]) => {
          const colaborador = this.respuestaConsulta.find(c => c.colaboradorId === colaboradorId);
          if (!colaborador) return 0;
  
          const estadoEncontrado = colaborador.estadosSolicitudes.find(e => e.estado === estado);
          return estadoEncontrado ? estadoEncontrado.cantidad : 0;
        }),
        backgroundColor: this.getColor(estado),
        borderWidth: 1
      };
    });
  
    const config: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: {
        labels: colaboradoresArray.map(([_, nombre]) => nombre),
        datasets
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  
    const ctx = this.chartColaboradores.nativeElement.getContext('2d');
    if (ctx) {
      this.chart2 = new Chart(ctx, config);
    }
  }
  

  getColor(estado: string): string {
    const colores: { [key: string]: string } = {
      "En Revisión": "rgba(255, 99, 132, 0.6)",
      "Resuelto": "rgba(54, 162, 235, 0.6)",
      "En Proceso": "rgba(255, 206, 86, 0.6)",
      "Radicado": "rgba(75, 192, 192, 0.6)",
      "Escalado": "rgba(153, 102, 255, 0.6)"
    };
    return colores[estado] || "rgba(200, 200, 200, 0.6)";
  }

  calcularDatos() {
    if (!this.respuestaConsulta || this.respuestaConsulta.length === 0) return;
  
    this.cantidadColaboradores = this.respuestaConsulta.filter(c => c.colaboradorId !== null).length;
  
    let totalEstados = 0;
    let colaboradorConMasCasos = { id: null, nombre: '', cantidad: 0 };
    let colaboradorConMenosCasos = { id: null, nombre: '', cantidad: Infinity };
    let colaboradorConMasPendientes = { id: null, nombre: '', cantidad: 0 };
  
    this.respuestaConsulta.forEach(colaborador => {
      let totalCasos = colaborador.estadosSolicitudes.reduce((sum, estado) => sum + estado.cantidad, 0);
      let totalPendientes = colaborador.estadosSolicitudes
        .filter(estado => estado.estado === "En Revisión" || estado.estado === "En Proceso")
        .reduce((sum, estado) => sum + estado.cantidad, 0);
  
      totalEstados += totalCasos;
  
      if (totalCasos > colaboradorConMasCasos.cantidad) {
        colaboradorConMasCasos = { id: colaborador.colaboradorId, nombre: colaborador.colaboradorNombre, cantidad: totalCasos };
      }
  
      if (totalCasos < colaboradorConMenosCasos.cantidad) {
        colaboradorConMenosCasos = { id: colaborador.colaboradorId, nombre: colaborador.colaboradorNombre, cantidad: totalCasos };
      }
  
      if (totalPendientes > colaboradorConMasPendientes.cantidad) {
        colaboradorConMasPendientes = { id: colaborador.colaboradorId, nombre: colaborador.colaboradorNombre, cantidad: totalPendientes };
      }
    });
  
    this.cantidadTotalEstados = totalEstados;
    this.colaboradorMasCasos = colaboradorConMasCasos.nombre || "Sin asignar";
    this.colaboradorMenosCasos = colaboradorConMenosCasos.nombre || "Sin asignar";
    this.colaboradorMasPorResolver = colaboradorConMasPendientes.nombre || "Sin asignar";
  }
  
  
}
