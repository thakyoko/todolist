// JavaScript

// รับข้อมูล ToDo List จาก localStorage หรือสร้าง array ว่างหากไม่มีข้อมูล
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// แสดงรายการ ToDo List บนหน้าเว็บ
function displayTasks() {
    const taskContainer = document.getElementById('taskList');
    taskContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task'); // สร้างแบบการ์ดสำหรับแสดงรายการงาน

        const title = document.createElement('div');
        title.classList.add('content');

        const dateTime = document.createElement('p');
        dateTime.textContent = `วันที่: ${task.dateTime}`;

        const header = document.createElement('div');
        header.classList.add('header');
        header.textContent = task.text;

        const description = document.createElement('div');
        description.classList.add('description');
        description.textContent = `คำอธิบาย: ${task.description || 'ไม่มีคำอธิบาย'}`;

        const buttons = document.createElement('div');
        buttons.classList.add('task-buttons');

        const checkButton = document.createElement('button');
        checkButton.textContent = task.completed ? 'เรียบร้อย' : 'ทำแล้ว';
        checkButton.onclick = () => toggleTask(index);

        const editButton = document.createElement('button');
        editButton.textContent = 'แก้ไข';
        editButton.onclick = () => editTask(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'ลบ';
        deleteButton.onclick = () => confirmDelete(index);

        buttons.appendChild(checkButton);
        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);

        title.appendChild(header);
        taskCard.appendChild(title);
        taskCard.appendChild(description);
        taskCard.appendChild(dateTime);
        taskCard.appendChild(buttons);

        taskContainer.appendChild(taskCard);
    });
}

// ฟังก์ชันสำหรับรับวันที่และเวลาปัจจุบัน
function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${date} เวลา ${time}`;
}

// เพิ่มงานใหม่
function addTask() {
    const taskText = document.getElementById('task').value;
    const descriptionText = document.getElementById('description').value;

    if (taskText.trim() !== '') {
        const dateTime = getCurrentDateTime();
        tasks.push({ text: taskText, completed: false, dateTime: dateTime, description: descriptionText });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.getElementById('task').value = '';
        document.getElementById('description').value = '';
        displayTasks();
    }
}

// แก้ไขงาน
function editTask(index) {
    const newText = prompt('แก้ไขรายการ', tasks[index].text);
    const newDescription = prompt('แก้ไขคำอธิบาย', tasks[index].description);

    if (newText !== null) {
        tasks[index].text = newText;
        tasks[index].description = newDescription;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

// ลบงาน
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// เปลี่ยนสถานะของงาน (เมื่อติ๊กเครื่องหมายเสร็จ)
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// ยืนยันการลบงาน
function confirmDelete(index) {
    const confirmation = confirm('คุณแน่ใจหรือไม่ที่จะลบงานนี้?');
    if (confirmation) {
        deleteTask(index);
    }
}

// แสดงรายการ ToDo List เมื่อหน้าเว็บโหลดเสร็จ
window.onload = function () {
    displayTasks();
};

// สร้างฟังก์ชันสร้าง footer
function createFooter() {
    const footer = document.createElement('footer');
    footer.style.fontSize = '14px';
    footer.style.color = 'gray';
    footer.style.textAlign = 'center';

    const developerInfo = document.createElement('div');
    developerInfo.textContent = 'Developed by Sathaporn Khwannakorn';

    const youtubeLink = document.createElement('div');
    const youtubeAnchor = document.createElement('a');
    youtubeAnchor.href = 'https://www.youtube.com/channel/UCDjcrowvt-PF9HD5avk1m3A/videos';
    youtubeAnchor.target = '_blank';
    youtubeAnchor.textContent = 'Visit My YouTube Channel';
    youtubeLink.appendChild(youtubeAnchor);

    const ccLicenseInfo = document.createElement('div');
    const ccAnchor = document.createElement('a');
    ccAnchor.rel = 'license';
    ccAnchor.href = 'http://creativecommons.org/licenses/by/4.0/';
    const ccImage = document.createElement('img');
    ccImage.alt = 'Creative Commons License';
    ccImage.style.borderWidth = '0';
    ccImage.src = 'https://i.creativecommons.org/l/by/4.0/88x31.png';
    ccAnchor.appendChild(ccImage);
    const ccText = document.createElement('br');
    const ccLicense = document.createElement('a');
    ccLicense.rel = 'license';
    ccLicense.href = 'http://creativecommons.org/licenses/by/4.0/';
    ccLicense.textContent = 'Creative Commons Attribution 4.0 International License';
    ccLicenseInfo.appendChild(ccAnchor);
    ccLicenseInfo.appendChild(ccText);
    ccLicenseInfo.appendChild(ccLicense);

    footer.appendChild(developerInfo);
    footer.appendChild(youtubeLink);
    footer.appendChild(ccLicenseInfo);

    return footer;
}

// เรียกใช้ฟังก์ชันสร้าง footer และเพิ่มลงใน DOM
const container = document.querySelector('.container');
container.appendChild(createFooter());
