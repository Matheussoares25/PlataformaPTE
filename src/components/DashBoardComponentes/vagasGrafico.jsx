import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import Api from "../../services/EndPoint";

export default function VagasChart() {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const candidaturas = await Api.CallEndpoint("Candidaturas", "GET");
        const criadas = await Api.CallEndpoint("Vagas", "GET");

        setDados([
          { nome: "Vagas criadas", total: criadas.length, cor: "#46abe5" },
          { nome: "Candidaturas", total: candidaturas.length, cor: "#2f6fed" },
        ]);
      } catch (err) {
        console.error(err);
        setErro("Não foi possível carregar os dados de vagas.");
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  return (
    <div className="dashboard-panel span-2">
      <div className="panel-header">
        <h5>Vagas criadas x Candidaturas</h5>
      </div>

      {carregando ? (
        <div className="training-empty">
          <div className="training-empty-icon">⏳</div>
          <h5>Carregando dados...</h5>
        </div>
      ) : erro ? (
        <div className="training-empty">
          <div className="training-empty-icon">⚠️</div>
          <h5>{erro}</h5>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dados} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
            <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={12} allowDecimals={false} />
            <YAxis
              type="category"
              dataKey="nome"
              stroke="rgba(255,255,255,0.4)"
              fontSize={13}
              width={110}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(17,20,34,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
              }}
              labelStyle={{ color: "#fff" }}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="total" radius={[0, 6, 6, 0]} barSize={36}>
              {dados.map((item, i) => (
                <Cell key={i} fill={item.cor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}