export function CreateUserForm() {
  return (
    <form action="/admin/users" method="get" className="rounded-3xl border border-white/8 bg-white/4 p-4">
      <p className="text-sm text-muted">
        Use the users screen to create and manage accounts.
      </p>
    </form>
  );
}
