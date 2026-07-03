import { useState, useEffect } from "react";
import { Trash2, LogOut, MessageSquare, Mail, User, Calendar, AlertCircle, CheckCircle } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Check for stored token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      fetchMessages(storedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem("adminToken", data.token);
        fetchMessages(data.token);
      } else {
        setError(data.error || "Mot de passe incorrect");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Impossible de se connecter au serveur");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (authToken: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/messages", {
        headers: {
          Authorization: authToken,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessages(data.messages);
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error("Fetch messages error:", err);
      setError("Impossible de charger les messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        setMessages(messages.filter((m) => m.id !== id));
        setDeleteConfirm(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Impossible de supprimer le message");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          Authorization: token,
        },
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("adminToken");
    setToken("");
    setIsAuthenticated(false);
    setMessages([]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div className="bg-base-100 p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-2xl font-bold">Admin</h1>
            <p className="text-base-content/60 mt-2">Connexion pour voir les messages</p>
          </div>

          {error && (
            <div className="alert alert-error mb-6">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Mot de passe</span>
              </label>
              <input
                type="password"
                placeholder="Entre ton mot de passe"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-secondary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/#contact" className="text-sm text-secondary hover:underline">
              ← Retour au portfolio
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <header className="bg-base-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-secondary" />
            <h1 className="text-xl font-bold">Admin - Messages</h1>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-ghost btn-sm"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="alert alert-error mb-6">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-base-100 p-6 rounded-xl shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-full">
                <MessageSquare className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Total</p>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-base-100 rounded-xl shadow overflow-hidden">
          <div className="p-4 border-b border-base-200">
            <h2 className="font-semibold">Messages reçus</h2>
          </div>

          {loading && messages.length === 0 ? (
            <div className="p-8 text-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-base-content/30 mx-auto mb-4" />
              <p className="text-base-content/60">Aucun message pour le moment</p>
            </div>
          ) : (
            <div className="divide-y divide-base-200">
              {messages.map((msg) => (
                <div key={msg.id} className="p-4 hover:bg-base-200/50">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-4 h-4 text-secondary" />
                        <span className="font-medium">{msg.name}</span>
                        <span className="text-base-content/50">•</span>
                        <Mail className="w-4 h-4 text-base-content/50" />
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-sm text-secondary hover:underline"
                        >
                          {msg.email}
                        </a>
                      </div>

                      <p className="text-base-content/80 whitespace-pre-wrap mb-2">
                        {msg.message}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-base-content/50">
                        <Calendar className="w-4 h-4" />
                        {formatDate(msg.createdAt)}
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2">
                      {deleteConfirm === msg.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(msg.id)}
                            className="btn btn-error btn-sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Confirmer
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="btn btn-ghost btn-sm"
                          >
                            Annuler
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(msg.id)}
                          className="btn btn-ghost btn-sm text-error"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <a href="/#contact" className="text-sm text-secondary hover:underline">
            ← Retour au portfolio
          </a>
        </div>
      </main>
    </div>
  );
};

export default Admin;