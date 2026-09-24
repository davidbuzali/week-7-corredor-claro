import { useEffect, useRef } from "react";
import L from "leaflet";
import { segments, stops, vehicles } from "./data";
import type { Stop } from "./types";

type MapViewProps = {
  onSelectStop: (stop: Stop) => void;
};

export function MapView({ onSelectStop }: MapViewProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const map = L.map(elementRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView([19.358, -99.025], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    segments.forEach((segment) => {
      const from = stops.find((stop) => stop.name === segment.from);
      const to = stops.find((stop) => stop.name === segment.to);
      if (!from || !to) return;
      const uncertain = segment.coverage < 0.75;
      L.polyline(
        [
          [from.lat, from.lng],
          [to.lat, to.lng],
        ],
        {
          color: uncertain ? "#d68b18" : "#0c8c91",
          weight: 7,
          dashArray: uncertain ? "10 12" : undefined,
          opacity: 0.92,
        },
      )
        .bindTooltip(uncertain ? "Cobertura incompleta - UNKNOWN" : "Segmento observado")
        .addTo(map);
    });

    stops.forEach((stop, index) => {
      const marker = L.circleMarker([stop.lat, stop.lng], {
        radius: stop.highDependence ? 9 : 7,
        color: "#0a2f4d",
        fillColor: stop.sampled ? "#ffffff" : "#f6b84a",
        fillOpacity: 1,
        weight: 3,
      });
      marker.bindTooltip(`${index + 1}. ${stop.name}`);
      marker.on("click", () => onSelectStop(stop));
      marker.addTo(map);
    });

    vehicles.forEach((point) => {
      L.circleMarker(point, {
        radius: 5,
        color: "#ffffff",
        weight: 2,
        fillColor: "#163e5a",
        fillOpacity: 1,
      })
        .bindTooltip("Vehiculo anonimo - dato simulado")
        .addTo(map);
    });

    L.control
      .scale({ imperial: false, position: "bottomleft" })
      .addTo(map);

    return () => {
      map.remove();
    };
  }, [onSelectStop]);

  return (
    <div className="map-shell">
      <div ref={elementRef} className="map" aria-label="Mapa interactivo del corredor simulado Oriente 1" />
      <div className="map-fallback">
        Corredor Oriente 1: Iztapalapa - Zaragoza, 8 paradas, 7 segmentos. Si el mapa no carga, la evidencia continua disponible en los paneles.
      </div>
    </div>
  );
}
