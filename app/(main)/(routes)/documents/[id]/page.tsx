export default function DocumentPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return <div>DocumentPage {id}</div>;
}
