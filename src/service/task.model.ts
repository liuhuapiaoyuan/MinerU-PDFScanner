export interface Task {
    /** 任务ID */
    task_id: string;
    /** 文件名 */
    file_name: string;
    /** PDF文件的URL */
    pdf_url: string;
    /** Markdown文件的URL */
    md_url: string;
    /** 图像数据 */
    images: string;
    /** 模型的JSON数据 */
    model_json: string;
    /** 中间处理的JSON数据 */
    middle_json: string;
    /** 内容列表的JSON数据 */
    content_list_json: string;
    /** 任务状态 */
    status: string;
}
