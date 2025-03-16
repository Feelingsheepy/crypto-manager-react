'use client'

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  totalInvested: number;
  uninvestedFunds: number;
}

const mockClients: Client[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', totalInvested: 50000, uninvestedFunds: 5000 },
  { id: '2', firstName: 'Jane', lastName: 'Smith', totalInvested: 75000, uninvestedFunds: 2500 },
  { id: '3', firstName: 'Bob', lastName: 'Johnson', totalInvested: 25000, uninvestedFunds: 10000 },
];

export default function ClientList() {
  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow-xl">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Invested</th>
            <th>Uninvested Funds</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockClients.map((client) => (
            <tr key={client.id} className="hover">
              <td className="font-medium">
                {client.firstName} {client.lastName}
              </td>
              <td className="text-success">
                ${client.totalInvested.toLocaleString()}
              </td>
              <td className="text-info">
                ${client.uninvestedFunds.toLocaleString()}
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => window.location.href = `/clients/${client.id}`}
                >
                  View Portfolio
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}