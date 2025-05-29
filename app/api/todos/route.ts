import { FactoryApi } from "@/app/_dal/factoryApi";
import { DbType } from "@/app/ctypes";

const api = FactoryApi.getClass(process.env.DB_TYPE as DbType);

export async function GET() {
  const data = await api.getTodos(); 
  return Response.json({ data });
}

export async function POST(request: Request) {
  const data = await request.json();
  const newTodoItem = await api.addTodo(data.text);
  return Response.json({ newTodo: newTodoItem });
}

export async function PATCH(request: Request) {
  const data = await request.json();
  const { id } = data;
  const PatchedTodoId = await api.markTodoComplete(id);
  return Response.json({ PatchedTodoId: PatchedTodoId });
}

export async function DELETE(request: Request) {
  const data = await request.json();
  const { id } = data;
  const deletedTodoId = await api.deleteTodo(id);
  return Response.json({ deletedTodoId: deletedTodoId });
}
