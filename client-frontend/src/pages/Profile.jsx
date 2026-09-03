import React, { useState } from "react";

/**
 * Página de Perfil — pronta para integração com API.
 *
 * Props:
 * user, loading, onUpdateProfile, onChangePassword, onChangeAvatar
 *
 * Nenhum dado de usuário é criado ou persistido localmente.
 */

const EMPTY_USER = {
  name: "",
  email: "",
  document: "",
  phone: "",
  linkedin: "",
  avatar: "",
};

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function Profile({
  user = EMPTY_USER,
  loading = false,
  onUpdateProfile,
  onChangePassword,
  onChangeAvatar,
}) {
  const normalizedUser = { ...EMPTY_USER, ...(user || {}) };

  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState(normalizedUser);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const initials = getInitials(normalizedUser.name);

  const updateField = (field, value) =>
    setProfileForm((current) => ({ ...current, [field]: value }));

  const updatePasswordField = (field, value) => {
    setPasswordForm((current) => ({ ...current, [field]: value }));
    setPasswordMessage("");
  };

  const handleEdit = () => {
    setProfileForm(normalizedUser);
    setProfileMessage("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfileForm(normalizedUser);
    setProfileMessage("");
    setIsEditing(false);
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    setProfileMessage("");

    if (typeof onUpdateProfile !== "function") {
      setProfileMessage("A integração de atualização ainda não foi configurada.");
      return;
    }

    try {
      await onUpdateProfile(profileForm);
      setIsEditing(false);
      setProfileMessage("Alterações salvas.");
    } catch (error) {
      setProfileMessage(
        error?.message || "Não foi possível salvar as alterações."
      );
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setPasswordMessage("");

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setPasswordMessage("Preencha todos os campos de senha.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("A confirmação da senha não corresponde à nova senha.");
      return;
    }

    if (typeof onChangePassword !== "function") {
      setPasswordMessage(
        "A integração de alteração de senha ainda não foi configurada."
      );
      return;
    }

    try {
      await onChangePassword(passwordForm);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordMessage("Senha alterada com sucesso.");
    } catch (error) {
      setPasswordMessage(
        error?.message || "Não foi possível alterar a senha."
      );
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file && typeof onChangeAvatar === "function") {
      onChangeAvatar(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-[240px] shrink-0 border-r border-[#e8e8e8] bg-white lg:flex lg:flex-col">
          <div className="flex h-[80px] items-center justify-between border-b border-[#eeeeee] px-5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#574bb8] text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="4" width="6" height="6" rx="1" />
                  <rect x="14" y="4" width="6" height="6" rx="1" />
                  <rect x="4" y="14" width="6" height="6" rx="1" />
                  <rect x="14" y="14" width="6" height="6" rx="1" />
                </svg>
              </div>
              <span className="text-[20px] font-bold tracking-[-0.5px]">Levit</span>
            </div>

            <button type="button" aria-label="Abrir menu" className="rounded-md p-2 text-[#222] hover:bg-[#f5f5f5]">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 py-6">
            <div className="space-y-1">
              {["Dashboard", "Módulos"].map((item) => (
                <button key={item} type="button" className="w-full px-5 py-3 text-left text-[14px] font-medium text-[#a3a3a3] hover:bg-[#fafafa]">
                  {item}
                </button>
              ))}

              <div className="my-4 border-t border-[#eeeeee]" />

              {["Equipe", "Configurações", "Automações"].map((item) => (
                <button key={item} type="button" className="w-full px-5 py-3 text-left text-[14px] font-medium text-[#a3a3a3] hover:bg-[#fafafa]">
                  {item}
                </button>
              ))}

              <button type="button" className="mt-1 w-full border-l-[3px] border-[#574bb8] bg-[#fafafa] px-[17px] py-3 text-left text-[14px] font-semibold text-[#111111]">
                Perfil
              </button>
            </div>
          </nav>

          <div className="border-t border-[#eeeeee] px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#574bb8] text-[12px] font-semibold text-white">
                {initials || "?"}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold">{normalizedUser.name || "Perfil"}</p>
                <p className="text-[11px] text-[#999]">Usuário</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Conteúdo */}
        <main className="min-w-0 flex-1">
          <header className="flex min-h-[80px] items-center border-b border-[#e8e8e8] bg-white px-5 sm:px-8 lg:px-9">
            <div className="flex items-center gap-3 lg:hidden">
              <button type="button" aria-label="Abrir menu" className="rounded-md p-2 text-[#574bb8]">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>
            </div>
            <h1 className="text-[22px] font-bold tracking-[-0.4px]">Perfil</h1>
            <div className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#574bb8] text-[13px] font-semibold text-white lg:hidden">
              {initials || "?"}
            </div>
          </header>

          <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 lg:px-9 lg:py-8">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.9fr)]">
              {/* Informações pessoais */}
              <section className="rounded-[12px] border border-[#e5e5e5] bg-white">
                <div className="border-b border-[#eeeeee] px-6 py-5 sm:px-7">
                  <h2 className="text-[17px] font-bold">Informações pessoais</h2>
                  <p className="mt-1 text-[13px] text-[#777]">
                    Consulte e atualize suas informações de perfil.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="px-6 py-7 sm:px-7">
                  <div className="mb-8 flex flex-col items-center sm:flex-row">
                    <div className="relative">
                      <div className="flex h-[108px] w-[108px] items-center justify-center overflow-hidden rounded-full bg-[#574bb8] text-[44px] font-medium text-white">
                        {normalizedUser.avatar ? (
                          <img src={normalizedUser.avatar} alt="Foto do perfil" className="h-full w-full object-cover" />
                        ) : (
                          initials || "?"
                        )}
                      </div>

                      <label
                        htmlFor="avatar-upload"
                        title="Alterar foto"
                        className="absolute bottom-0 right-[-2px] flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-white shadow-sm"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#222]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                        </svg>
                      </label>

                      <input id="avatar-upload" type="file" accept="image/*" className="hidden" disabled={!onChangeAvatar} onChange={handleAvatarChange} />
                    </div>

                    <div className="mt-4 text-center sm:ml-5 sm:mt-0 sm:text-left">
                      <h3 className="text-[20px] font-bold">{normalizedUser.name || "Usuário"}</h3>
                      <p className="mt-1 text-[13px] text-[#777]">{normalizedUser.email || "E-mail não informado"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
                    <ProfileField label="Nome e Sobrenome" value={profileForm.name} placeholder="Nome e sobrenome" disabled={!isEditing || loading} onChange={(value) => updateField("name", value)} />
                    <ProfileField label="E-Mail Corporativo" type="email" value={profileForm.email} placeholder="E-mail corporativo" disabled={!isEditing || loading} onChange={(value) => updateField("email", value)} />
                    <ProfileField label="CPF ou CNPJ" value={profileForm.document} placeholder="CPF ou CNPJ" disabled={!isEditing || loading} onChange={(value) => updateField("document", value)} />
                    <ProfileField label="Telefone" value={profileForm.phone} placeholder="Telefone" disabled={!isEditing || loading} onChange={(value) => updateField("phone", value)} />
                    <div className="md:col-span-2">
                      <ProfileField label="LinkedIn (URL)" type="url" value={profileForm.linkedin} placeholder="https://linkedin.com/in/..." disabled={!isEditing || loading} onChange={(value) => updateField("linkedin", value)} />
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    {isEditing ? (
                      <>
                        <button type="button" onClick={handleCancel} disabled={loading} className="h-11 rounded-[7px] border border-[#d9d9d9] px-6 text-[14px] font-semibold text-[#555] hover:bg-[#f7f7f7] disabled:opacity-50">
                          Cancelar
                        </button>
                        <button type="submit" disabled={loading} className="h-11 rounded-[7px] bg-[#574bb8] px-7 text-[14px] font-semibold text-white hover:bg-[#4d42aa] disabled:opacity-60">
                          {loading ? "Salvando..." : "Salvar alterações"}
                        </button>
                      </>
                    ) : (
                      <button type="button" onClick={handleEdit} disabled={loading} className="h-11 rounded-[7px] bg-[#574bb8] px-8 text-[14px] font-semibold text-white hover:bg-[#4d42aa] disabled:opacity-60">
                        Editar
                      </button>
                    )}
                  </div>

                  {profileMessage && <p className="mt-4 text-right text-[13px] text-[#666]">{profileMessage}</p>}
                </form>
              </section>

              {/* Segurança */}
              <section className="h-fit rounded-[12px] border border-[#e5e5e5] bg-white">
                <div className="border-b border-[#eeeeee] px-6 py-5 sm:px-7">
                  <h2 className="text-[17px] font-bold">Segurança</h2>
                  <p className="mt-1 text-[13px] text-[#777]">
                    Atualize sua senha para manter sua conta protegida.
                  </p>
                </div>

                <form onSubmit={handleChangePassword} className="px-6 py-7 sm:px-7">
                  <div className="space-y-5">
                    <PasswordField label="Senha Atual" value={passwordForm.currentPassword} disabled={loading} onChange={(value) => updatePasswordField("currentPassword", value)} />
                    <PasswordField label="Nova Senha" value={passwordForm.newPassword} disabled={loading} onChange={(value) => updatePasswordField("newPassword", value)} />
                    <PasswordField label="Confirmar Nova Senha" value={passwordForm.confirmPassword} disabled={loading} onChange={(value) => updatePasswordField("confirmPassword", value)} />
                  </div>

                  <button type="submit" disabled={loading} className="mt-7 h-11 w-full rounded-[7px] bg-[#574bb8] px-6 text-[14px] font-semibold text-white hover:bg-[#4d42aa] disabled:opacity-60">
                    {loading ? "Atualizando..." : "Alterar senha"}
                  </button>

                  {passwordMessage && <p className="mt-4 text-[13px] text-[#666]">{passwordMessage}</p>}
                </form>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ProfileField({ label, type = "text", value, placeholder, disabled, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-semibold text-[#222]">{label}</span>
      <input
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-[7px] border border-[#dedede] bg-white px-4 text-[14px] text-[#222] outline-none placeholder:text-[#999] focus:border-[#574bb8] focus:ring-2 focus:ring-[#574bb8]/10 disabled:cursor-not-allowed disabled:bg-[#f8f8f8] disabled:text-[#666]"
      />
    </label>
  );
}

function PasswordField({ label, value, disabled, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-semibold text-[#222]">{label}</span>
      <input
        type="password"
        value={value}
        disabled={disabled}
        autoComplete="new-password"
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-[7px] border border-[#dedede] bg-white px-4 text-[14px] text-[#222] outline-none placeholder:text-[#999] focus:border-[#574bb8] focus:ring-2 focus:ring-[#574bb8]/10 disabled:cursor-not-allowed disabled:bg-[#f8f8f8]"
      />
    </label>
  );
}

export default Profile;
