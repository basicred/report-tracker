import { useState } from "react";

const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

export default function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [data, setData] = useState({});
  const [password, setPassword] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(months[0]);

  const addStudent = () => {
    if (name && !students.includes(name)) {
      setStudents([...students, name]);
      setName("");
    }
  };

  const toggleCheck = (month, student) => {
    const newData = { ...data };
    if (!newData[month]) newData[month] = {};
    newData[month][student] = !newData[month][student];
    setData(newData);
  };

  const handleLogin = () => {
    if (enteredPassword === password) {
      setAuthenticated(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  if (!authenticated) {
    return (
      <div className="p-4 max-w-md mx-auto">
        {password ? (
          <div>
            <input
              placeholder="비밀번호 입력"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              type="password"
              className="border p-2 mb-2 w-full"
            />
            <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              입장
            </button>
          </div>
        ) : (
          <div>
            <input
              placeholder="새 비밀번호 설정"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border p-2 mb-2 w-full"
            />
            <button onClick={() => setAuthenticated(true)} className="bg-green-500 text-white px-4 py-2 rounded w-full">
              설정 완료
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">레포트 제출 체크</h1>

      <div className="mb-4">
        <input
          placeholder="학생 이름 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2 w-2/3"
        />
        <button onClick={addStudent} className="bg-blue-500 text-white px-4 py-2 rounded">
          학생 추가
        </button>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => setCurrentMonth(month)}
            className={`px-3 py-1 rounded ${currentMonth === month ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="grid gap-2">
        {students.map((student) => (
          <div key={student} className="flex justify-between items-center border p-2 rounded">
            <span>{student}</span>
            <input
              type="checkbox"
              checked={data[currentMonth]?.[student] || false}
              onChange={() => toggleCheck(currentMonth, student)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
