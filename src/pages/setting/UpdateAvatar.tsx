import {useState} from "react";
import {useModel} from "@@/exports";
import Avatar from "@/components/Avatar";
import {message} from "antd";

export const UpdateAvatar = () => {
    const user = useModel('global');
    const [avatar, setAvatar] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const handleFileChange = (event) => {
        if (event !== null) {
            if (event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/png") {
                alert("只能上传 JPG 或 PNG 格式的图片。");
                return;
            }
            const file = event.target.files[0];
            setAvatar(file);
        }
    };

    const handleUpload = async () => {
        if (!avatar) {
            return;
        }
        setIsUploading(true);
        setUploadError(null);

        try {
            const formData = new FormData();
            formData.append("avatar", avatar);
            await fetch("/api/updateAvatar", {
                method: "POST",
                body: formData,
            }).then(() => {
                message.success("头像上传成功，需等待一段时间才能看到更新，或请直接清理缓存");
            });
            setIsUploading(false);
        } catch (error: any) {
            setIsUploading(false);
            setUploadError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mr-4">
                    {avatar ? (
                        <img
                            src={URL.createObjectURL(avatar)}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Avatar userId={user.userId} />
                    )}
                </div>
            </div>
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 ml-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-4"
                />
                <button
                    type="button"
                    onClick={handleUpload}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                    disabled={!avatar || isUploading}
                >
                    {isUploading ? "Uploading..." : "上传（仅能上传 JPG 或 PNG 格式的图片）"}
                </button>
                {uploadError && (
                    <p className="mt-4 text-red-500">{uploadError}</p>
                )}
            </div>
        </div>
    )
}
