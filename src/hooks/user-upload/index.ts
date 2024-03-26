import { uploadImage } from '@/api/user';

export default function useUpload() {
  // 存储上传的图片列表
  const imageList = ref<any[]>([]);
  // 存储预览文件列表
  const previewList = ref<any[]>([]);
  const deletePic = (event) => {
    previewList.value.splice(event.index, 1);
  };
  // 上传方法
  async function uploadImages(event) {
    // 假设这里是上传图片的逻辑，可以根据实际情况进行修改
    // 这里只是简单地将上传的文件添加到图片列表和预览列表中
    const lists: any[] = [].concat(event.file);
    let fileListLen = previewList.value.length;
    // eslint-disable-next-line array-callback-return
    lists.map((item) => {
      previewList.value.push({
        ...item,
        status: 'uploading',
        message: '上传中',
      });
    });
    for (let i = 0; i < lists.length; i++) {
      const result = await uploadImage(lists[i]?.url);

      const item = previewList.value[fileListLen];
      previewList.value.splice(fileListLen, 1, {
        ...item,
        status: 'success',
        message: '',
        url: result,
      });
      fileListLen++;
    }
  }

  return {
    imageList,
    previewList,
    uploadImages,
    deletePic,
  }
}
