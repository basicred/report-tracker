import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

export default function ReportTracker() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [data, setData] = useState({});
  const [password, setPassword] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

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
            <Input
              placeholder="비밀번호 입력"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              type="password"
              className="mb-2"
            />
            <Button onClick={handleLogin}>입장</Button>
          </div>
        ) : (
          <div>
            <Input
              placeholder="새 비밀번호 설정"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mb-2"
            />
            <Button onClick={() => setAuthenticated(true)}>설정 완료</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">레포트 제출 체크</h1>
      <div className="mb-4">
        <Input
          placeholder="학생 이름 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2"
        />
        <Button onClick={addStudent}>학생 추가</Button>
      </div>

      <Tabs defaultValue={months[0]}>
        <TabsList className="overflow-x-auto whitespace-nowrap">
          {months.map((month) => (
            <TabsTrigger key={month} value={month}>
              {month}
            </TabsTrigger>
          ))}
        </TabsList>
        {months.map((month) => (
          <TabsContent key={month} value={month}>
            <div className="grid gap-2">
              {students.map((student) => (
                <Card key={student} className="flex items-center justify-between p-2">
                  <span>{student}</span>
                  <Switch
                    checked={data[month]?.[student] || false}
                    onCheckedChange={() => toggleCheck(month, student)}
                  />
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
