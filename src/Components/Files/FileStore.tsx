import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { UserFileType } from "../../Types/UserFileType";
import userStore from "../Users/UserStore";

class FileStore {
  files: UserFileType[] = [];
  fileShare: UserFileType[] = [];
  loading: boolean = false;
  error: string | null = null;
url :String= `${import.meta.env.VITE_API_URL}/File`;



  constructor() {
    makeAutoObservable(this);
    this.setupInterceptor();
  }

  private setupInterceptor() {
    axios.interceptors.request.use((config) => {
      const token = sessionStorage.getItem('token');
      if (config.headers["Content-Type"]!="multipart/form-data")
        config.headers.set("Content-Type", "application/json");
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }


 
  async fetchFiles() {
    try {
      runInAction(() => {
        this.loading = true;
      });

      if(userStore.user.id == null) {
        userStore.user.id =userStore.getUserId();
      }
      const response = await axios.get(`${this.url}/user/${userStore.user.id }`);

      runInAction(() => {
        this.files = response.data;
        this.error = null; 
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error fetching files";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchFileShare() {
    try {
      runInAction(() => {
        this.loading = true;
      });
      if (userStore.user.id == null) {
        userStore.user.id = parseInt(sessionStorage.getItem('userId') ?? '');
        userStore.fetchUser(userStore.user.id);
      }
      const response = await axios.get(`${this.url}/filesShared/${userStore.user.email}`);

      runInAction(() => {
        this.fileShare = response.data;
        this.error = null; // מאפסים שגיאות ישנות אם הקריאה הצליחה
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error fetching files";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }

  }


  async uploadFile(file: File, name: string, password: string, type: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", name);
    formData.append("password", password);
    formData.append("fileType", type);

    console.log(formData);
    if (userStore.user.id == null) {
      userStore.user.id = parseInt(sessionStorage.getItem('userId') ?? '');
    }
    try {
      runInAction(() => {
        this.loading = true;
      });

      console.log(userStore.user.id + "user id=" + userStore.user);

      const response = await axios.post(
        `${this.url}/upload/${userStore.user.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data);

      await this.fetchFiles();
      return response.data.message || "Upload successful";
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error uploading file";
      });
      throw new Error(error.response?.data?.message || "Upload failed");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }


  async deleteFile(fileId: number) {
    try {
      runInAction(() => {
        this.loading = true;
      });
    
      var response = await axios.delete(`${this.url}/${fileId}`);
      runInAction(() => {
        this.error = null;
      });
      await this.fetchFiles();
      return response.data.message || "deleting successful";
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error deleting file";
        
      });
      throw new Error(error.response?.data?.message || "deleting failed");

    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }


  async editFile(fileId: number, newName: string) {
    try {
      runInAction(() => {

        this.loading = true;
      }
      );
      await axios.put(`${this.url}/${fileId}`,
        newName

      );
      runInAction(() => {
        this.error = null;
      }
      );
       await this.fetchFiles();
      return "editing successful";
    }
    catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error editing file";
      });
      throw new Error(error.response?.data?.message || "editing failed");
    }
  }


  async shareFile(file: UserFileType, email: string) {
    console.log(email);

    try {
      runInAction(() => {

        this.loading = true;
      });
      const response = await axios.put(`${this.url}/Sharing/${file.id}`, email);
      runInAction(() => {
        this.error = null;
        this.loading = false;
        console.log(response.data);
        userStore.sendEmail(
          email,
          `📁 GKS - ${userStore.user.name} shared a file with you`,
          `Hello,\n
        ${userStore.user.name} has shared the following file with you: 🗂️ "${file.name}" 🙂\n
        🔑 The encrypted password to access the file is:\n
        ${response.data.password}\n\n
        💬  If you have any questions, feel free to reach out to the sender.\n\n
        Best regards,\n
        GKS Security`
        );
        
      });
      return response.data.message || "sharing successful";

    }
    catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error sharing file";
      });
      throw new Error(error.response?.data?.message || "sharing failed");

    }
  }


  async downloadFile(file: UserFileType) {
    try {
      runInAction(() => {
        this.loading = true;
      });
      const response = await axios.post(`${this.url}/decrypt-file/`,
        { Id: file.id,Passwopassword: file.filePassword },
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: file.fileType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      window.URL.revokeObjectURL(url);
      runInAction(() => {
        this.loading = false;
      });

    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error downloading file";
      });
    }
  }


  async getSharedfile(email: string, id: number, password: string): Promise<Blob | undefined> {
    try {
        runInAction(() => {
            this.loading = true;
        });
        
        const response = await axios.post(
            `${this.url}/CheckingIsAllowedView/${email}`,
            { Id: id, password },
            { responseType: "blob" }
        );

        if (response.status !== 200) throw new Error("Failed to fetch file");

        return new Blob([response.data], { type: response.headers["content-type"] });
    } catch (error) {
        runInAction(() => {
            this.error = "Error fetching shared file";
        });
        console.error("Error fetching file:", error);
    } finally {
        runInAction(() => {
            this.loading = false;
        });
    }
}
}




const fileStore = new FileStore();
export default fileStore;


