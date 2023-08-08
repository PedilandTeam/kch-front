const ContactForm = () => {
  return (
    <div className="max-w-[800px] w-full mx-auto my-20 sm:mb-28 px-3 sm:px-0">
      <h3 className="text-center font-semibold text-[18px] mb-5 text-pink-900">
        همچنین می‌تونید از طریق این فرم به راحتی با ما در تماس باشید.
      </h3>
      <div>
        <div className="row grid sm:grid-cols-3 gap-3">
          <div>
            <input
              type="text"
              placeholder="نام کامل"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="کشور"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="موضوع"
              className="input input-bordered w-full"
            />
          </div>
          <div className="sm:col-span-3">
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="متن پیام"
              rows={8}
            ></textarea>
          </div>
          <div className="sm:col-span-3">
            <button className="btn btn-outline btn-primary w-full">ارسال پیام</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
