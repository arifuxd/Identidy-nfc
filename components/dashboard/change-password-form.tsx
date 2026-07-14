"use client";

import { useState, useTransition } from "react";

import { changePasswordAction } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(null);
        setIsError(false);

        startTransition(async () => {
          const result = await changePasswordAction({
            currentPassword,
            newPassword,
            confirmPassword,
          });

          if (result.error) {
            setIsError(true);
            setMessage(result.error);
            return;
          }

          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setMessage(result.success ?? "Password updated.");
        });
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm text-muted">Current password</label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted">New password</label>
          <Input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted">Confirm new password</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
      </div>
      <Button type="submit" size="sm" disabled={isPending}>
        {isPending ? "Updating..." : "Change password"}
      </Button>
      {message ? (
        <p className={`text-sm ${isError ? "text-red-300" : "text-emerald-300"}`}>{message}</p>
      ) : null}
    </form>
  );
}
